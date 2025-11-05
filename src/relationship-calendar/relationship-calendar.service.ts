import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateRelationshipCalendarDto } from './dto/create-relationship-calendar.dto';
import { UpdateRelationshipCalendarDto } from './dto/update-relationship-calendar.dto';
import { RelationshipCalendar } from './entities/relationship-calendar.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario2/usuario.service';
import { CustomCalendarService } from 'src/custom-calendar/custom-calendar.service';
import { Repository } from 'typeorm';
import { EventoService } from 'src/evento/evento.service';
import { EventsRelationshipService } from 'src/events-relationship/events-relationship.service';

@Injectable()
export class RelationshipCalendarService {

  constructor(
    @InjectRepository(RelationshipCalendar)
    private _relationshipCalendarRepository: Repository<RelationshipCalendar>,
    private readonly _usuarioService: UsuarioService,
    private readonly _customCalendarService: CustomCalendarService,
    private readonly _eventService: EventoService,
    @Inject(forwardRef(() => EventsRelationshipService)) // Usa forwardRef aquí
    private readonly _eventsRelationshipService: EventsRelationshipService,
  ){

  }

  async create(createRelationshipCalendarDto: CreateRelationshipCalendarDto) {
    try {

      const userCreateExist = await this._usuarioService.findStatusByUuidValidationGeneral(createRelationshipCalendarDto.uuid_user_create);
      if (!userCreateExist.success) {
        return {
          success: false,
          message: 'No se encontró el usuario que crea la relación',  //cambiar mensaje
          data: null
        }
      }

      if (createRelationshipCalendarDto.email_user_relationship === undefined || createRelationshipCalendarDto.email_user_relationship === '') {
        return {
          success: false,
          message: 'El email del usuario relacionado es obligatorio',
          data: null
        }
      }

      const getUUIDUserRelationship = await this._usuarioService.findUserByEmail(createRelationshipCalendarDto.email_user_relationship);

      if (!getUUIDUserRelationship.success) {
        return {
          success: false,
          message: 'No se encontró el usuario relacionado con el email proporcionado',
          data: null
        }
      }

      const uuidUserRelationship = getUUIDUserRelationship.data;

      const userRelationshipExist = await this._usuarioService.findStatusByUuidValidationGeneral(uuidUserRelationship);
      if (!userRelationshipExist.success) {
        return {
          success: false,
          message: 'No se encontró el usuario relacionado con el calendario', //cambiar mensaje
          data: null
        }
      }

      const customCalendarExist = await this._customCalendarService.findByCveCalendar(createRelationshipCalendarDto.cve_calendar);
      if (!customCalendarExist.success) {
        return {
          success: false,
          message: 'No se encontró el calendario relacionado con el usuario', //cambiar mensaje
          data: null
        }
      }


      createRelationshipCalendarDto.uuid_user_relationship = uuidUserRelationship;
      const existRelationshipCalendar = await this.findByCveCalendarAndUuidUser(
        createRelationshipCalendarDto.cve_calendar,
        createRelationshipCalendarDto.uuid_user_create,
        createRelationshipCalendarDto.uuid_user_relationship
      );

      if (!existRelationshipCalendar.success) {
        return {
          success: false,
          message: existRelationshipCalendar.message,
          data: null
        }
      }

      const createRelationshipCalendar = await this._relationshipCalendarRepository.save(createRelationshipCalendarDto);
      if (!createRelationshipCalendar) {
        return {
          success: false,
          message: 'Error al crear la relación entre el calendario y el usuario',
          data: null
        }
      }

      return {
        success: true,
        message: 'Relación entre el calendario y el usuario creada con éxito',
        data: createRelationshipCalendar
      }
      
    }catch (error) {
      return {
        success: false,
        message: 'Error al crear la relación entre el calendario y el usuario',
        data: null
      }
    }
  }

  async findByCveCalendarAndUuidUser(cve_calendar: string, uuidUserCreate: string, uuidUserRelationship: string) {
    try {
      const relationshipCalendar = await this._relationshipCalendarRepository.findOne({
        where: {
          cve_calendar: cve_calendar, uuid_user_relationship: uuidUserRelationship//añadir validacion para cliente relacionado
        }
      });

      if(relationshipCalendar){
        return {
          success: false,
          message: 'Ya existe una relación entre el calendario y el usuario',
          data: null
        }
      }

      return {
        success: true,
        message: 'Es posible crear la relación entre el calendario y el usuario',
        data: relationshipCalendar
      }

    } catch (error) {
      return {
        success: false,
        message: 'Error al buscar la relación entre el calendario y el usuario',
        data: null
      }
    }
  }

  async findByCveCalendar(cve_calendar: string) {
    return await this._customCalendarService.findByCveCalendar(cve_calendar);
  }

  async findByCustomCalendar(createRelationshipCalendarDto: CreateRelationshipCalendarDto) {
    try {

      if(createRelationshipCalendarDto.uuid_user_create === undefined || createRelationshipCalendarDto.cve_calendar === undefined){
        return {
          success: false,
          message: 'Faltan datos para buscar las relaciones del calendario',
          data: null
        };
      }

      const relationshipCalendar = await this._relationshipCalendarRepository.find({
        where: {
          cve_calendar: createRelationshipCalendarDto.cve_calendar,
          uuid_user_create: createRelationshipCalendarDto.uuid_user_create,
          status: "1"
        }
      });

      if (!relationshipCalendar || relationshipCalendar.length === 0) {
        return {
          success: false,
          message: 'No se encontraron relaciones para el calendario especificado',
          data: null
        };
      }

      return {
        success: true,
        message: 'Relaciones encontradas para el calendario',
        data: relationshipCalendar
      };

    } catch (error) {
      return {
        success: false,
        message: 'Error al buscar las relaciones del calendario',
        data: null
      };
    }
  }

  async findMyEventsRelationshipByCalendar(createRelationshipCalendarDto: CreateRelationshipCalendarDto) {
    try {

      if(createRelationshipCalendarDto.uuid_user_create === undefined || createRelationshipCalendarDto.cve_calendar === undefined){
        return {
          success: false,
          message: 'Faltan datos para buscar las relaciones del calendario',
          data: null
        };
      }

      const relationshipCalendar = await this._relationshipCalendarRepository.findOne({
        where: {
          cve_calendar: createRelationshipCalendarDto.cve_calendar,
          uuid_user_create: createRelationshipCalendarDto.uuid_user_create,
          status: "1"
        }
      });

      if (!relationshipCalendar) {
        return {
          success: false,
          message: 'No se encontraron relaciones para el calendario especificado',
          data: null
        };
      }

      const eventRelationship = await this._eventsRelationshipService.findEventNameByCveCalendar(createRelationshipCalendarDto.cve_calendar);

      return {
        success: true,
        message: 'Relaciones encontradas para el calendario',
        data: eventRelationship
      };

    } catch (error) {
      return {
        success: false,
        message: 'Error al buscar las relaciones del calendario',
        data: null
      };
    }
      //if(relationshipCalendar.length === 0){
     
  }
  
  async findClientByCveCustomCalendar(cve_calendar: string) {
    try {
      const customCalendar = await this._customCalendarService.findByCveCalendar(cve_calendar);
      if (!customCalendar.success) {
        return {
          success: false,
          message: 'No se encontró el calendario personalizado',
          data: null
        };
      }

      const relationshipCalendar = await this._relationshipCalendarRepository.find({
        where: {
          cve_calendar: cve_calendar,
          status: "1"
        }
      });

      if (!relationshipCalendar || relationshipCalendar.length === 0) {
        return {
          success: false,
          message: 'No se encontraron relaciones para el calendario especificado',
          data: null
        };
      }

      const users = await Promise.all(relationshipCalendar.map(async (relationship) => {
        const user = await this._usuarioService.findByUuid(relationship.uuid_user_relationship);
        return user;
      }));

      const usersFiltered = users.filter(user => user.success); // Filtra los usuarios que fueron encontrados exitosamente

      //has una lista de los usuarios encontrados solamente mostrando el uuid_user y el email
      const usersFiltred = usersFiltered.map(user => ({
        uuid_user: user.data.uuid_user,
        //concatename el nombre y apellido
        full_name: `${user.data.name} ${user.data.lastname}`,
        email: user.data.email
      }));

      return {
        success: true,
        message: 'Relaciones encontradas para el calendario',
        data: usersFiltred
      };

    } catch (error) {
      return {
        success: false,
        message: 'Error al buscar las relaciones del calendario',
        data: null
      };
    }
  }

}
