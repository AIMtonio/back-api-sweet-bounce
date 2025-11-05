import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateEventsRelationshipDto } from './dto/create-events-relationship.dto';
import { UpdateEventsRelationshipDto } from './dto/update-events-relationship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RelationshipCalendar } from 'src/relationship-calendar/entities/relationship-calendar.entity';
import { Repository } from 'typeorm';
import { UsuarioService } from 'src/usuario2/usuario.service';
import { CustomCalendarService } from 'src/custom-calendar/custom-calendar.service';
import { EventsRelationship } from './entities/events-relationship.entity';
import { RelationshipCalendarService } from 'src/relationship-calendar/relationship-calendar.service';
import { EventoService } from 'src/evento/evento.service';

@Injectable()
export class EventsRelationshipService {

  constructor(
    @InjectRepository(EventsRelationship)
    private _eventsRelationshipRepository: Repository<EventsRelationship>,
    private readonly _usuarioService: UsuarioService,
    private readonly _customCalendarService: CustomCalendarService,
    private readonly _eventService: EventoService,
    @Inject(forwardRef(() => RelationshipCalendarService)) // Usa forwardRef aquí
    private readonly _relationshipCalendarService: RelationshipCalendarService,
  ) {}

  async create(createEventsRelationshipDto: CreateEventsRelationshipDto) {
    try{
      const calendarExist = await this._customCalendarService.findByCveCalendar(createEventsRelationshipDto.cve_calendar);
      if(!calendarExist.success) {
        return {
          success: false,
          message: calendarExist.message,
          data: null
        }
      }

      const eventExist = await this._eventService.findByCveEvent(createEventsRelationshipDto.cve_event);
      if(!eventExist.success) {
        return {
          success: false,
          message: eventExist.message,
          data: null
        }
      }

      const eventRelationshipExist = await this.findByCveCalendarAndCveEvent(
        createEventsRelationshipDto.cve_calendar,
        createEventsRelationshipDto.cve_event
      );
      if(eventRelationshipExist.success) {
        return {
          success: false,
          message: 'Ya existe una relación de eventos con ese calendario y evento',
          data: null
        }
      }

      const eventCreated = await this._eventsRelationshipRepository.save(createEventsRelationshipDto);
      if(!eventCreated) {
        return {
          success: false,
          message: 'Error al crear la relación de eventos',
          data: null
        }
      }

      return {
        success: true,
        message: 'Relación de eventos creada correctamente',
        data: eventCreated
      }

    }catch (error) {
      return {
        success: false,
        message: 'Error al crear la relación de eventos',
        data: null
      }
    }
  }

  async findByCveCalendarAndCveEvent(cve_calendar: string, cve_event: string) {
    try {
      const eventRelationship = await this._eventsRelationshipRepository.findOne({
        where: {
          cve_calendar: cve_calendar,
          cve_event: cve_event
        }
      });

      if(eventRelationship) {
        return {
          success: true,
          message: 'Relación de eventos encontrada',
          data: eventRelationship
        }
      }

      return {
        success: false,
        message: 'No se encontró una relación de eventos con ese calendario y evento',
        data: null
      }

    } catch (error) {
      console.error('Error finding event relationship:', error);
      return {
        success: false,
        message: 'Error al buscar la relación de eventos',
        data: null
      }
    }
  }

  async findEventNameByCveCalendar(cve_calendar: string) {
    try {
      const eventRelationships = await this._eventsRelationshipRepository.find({
        where: { cve_calendar: cve_calendar }
      });

      if (eventRelationships.length === 0) {
        return {
          success: false,
          message: 'No se encontraron eventos para el calendario especificado',
          data: null
        };
      }

      const eventNames = eventRelationships.map(eventRel => eventRel.cve_event);

      const eventsData = await this._eventService.findByCveEvents(eventNames);

      return eventsData.data;

      return {
        success: true,
        message: 'Eventos encontrados',
        data: eventsData
      };
    } catch (error) {
      console.error('Error finding event names:', error);
      return {
        success: false,
        message: 'Error al buscar los nombres de los eventos',
        data: null
      };
    }
  }
  
}
