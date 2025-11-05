import { Injectable } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';
import { In, Repository } from 'typeorm';
import { UsuarioService } from 'src/usuario2/usuario.service';
//import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EventoService {

  constructor(
    @InjectRepository(Evento)
    private _eventoRepository: Repository<Evento>,
    private readonly _usuarioService: UsuarioService,
  ) { }

  async create(createEventoDto: CreateEventoDto) {
    try {

      const usuario = await this._usuarioService.findStatusByUuidValidationGeneral(createEventoDto.uuid_user);
      if(!usuario.success){
        return {
          success: false,
          message: usuario.message,
          data: null
        };
      }

      createEventoDto.cve_event = this.generateEventCode();

      const eventoExist = await this.findByEventNameAndUUIDUser(createEventoDto.name, createEventoDto.uuid_user);
      if(!eventoExist.success){
        return {
          success: false,
          message: eventoExist.message,
          data: null
        };
      }

      const evento = await this._eventoRepository.save(createEventoDto);
      if(!evento) {
        return {
          success: false,
          message: 'Error al crear el evento',
          data: null
        };
      }
    }catch (error) {
      console.error('Error creating evento:', error);
    }

    return {
      success: true,
      message: 'Evento creado correctamente',
      data: createEventoDto
    };
  }

  async findAll() {
    try {
      const eventos = await this._eventoRepository.find();
      if (!eventos) {
        return {
          success: false,
          message: 'No se encontraron eventos',
          data: null
        };
      }
      return {
        success: true,
        message: 'Eventos encontrados',
        data: eventos
      };
    } catch (error) {
      console.error('Error finding eventos:', error);
    }
  }

  async findByClient(createEventoDto: CreateEventoDto) {
    try {

      if (!createEventoDto.uuid_user) {
        return {
          success: false,
          message: 'El usuario es obligatorio',
          data: null
        };
      }

      const usuario = await this._usuarioService.findStatusByUuidValidationGeneral(createEventoDto.uuid_user);
      if(!usuario.success){
        return {
          success: false,
          message: usuario.message,
          data: null
        };
      }

      const eventos = await this._eventoRepository.find({ where: { uuid_user: createEventoDto.uuid_user } });
      if (!eventos.length) {
        return {
          success: false,
          message: 'No se encontraron eventos',
          data: null
        };
      }

      return {
        success: true,
        message: 'Eventos encontrados',
        data: eventos
      };

    } catch (error) {
      console.error('Error finding eventos:', error);
    }
  }

  generateEventCode(): string {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
  }

  async findByCveEvent(cve_event: string) {
    try {

      if(!cve_event){
        return {
          success: false,
          message: 'El cve_event es requerido',
          data: null
        };
      }

      const evento = await this._eventoRepository.findOne({ where: { cve_event } });
      if (!evento) {
        return {
          success: false,
          message: 'No se encontró el evento',
          data: null
        };
      }

      return {
        success: true,
        message: 'Evento encontrado',
        data: evento
      };

    } catch (error) {
      console.error('Error finding evento:', error);
    }
  }

  async findByEventNameAndUUIDUser(event_name: string, uuid_user: string) {
    try {

      if(!event_name){
        return {
          success: false,
          message: 'El nombre del evento es requerido',
          data: null
        };
      }

      const evento = await this._eventoRepository.findOne({ where: { name: event_name, uuid_user:  uuid_user} });
      if (evento) {
        return {
          success: false,
          message: 'Ya existe un evento con ese nombre asignado a este usuario',
          data: null
        };
      }

      return {
        success: true,
        message: 'Es posible crear el evento con ese nombre',
        data: evento
      };

    } catch (error) {
      console.error('Error finding evento by name:', error);
    }
  }

  async findByCveEvents(cve_events: string[]) {
    try {
      if (!cve_events || !cve_events.length) {
        return {
          success: false,
          message: 'El arreglo de cve_event es requerido y no puede estar vacío',
          data: null
        };
      }

      const eventos = await this._eventoRepository.find({
        where: {
          cve_event: In(cve_events), // Utiliza la cláusula IN para buscar múltiples valores
        },
      });

      if (!eventos.length) {
        return {
          success: false,
          message: 'No se encontraron eventos con los cve_event proporcionados',
          data: null
        };
      }

      return {
        success: true,
        message: 'Eventos encontrados',
        data: eventos
      };

    } catch (error) {
      console.error('Error finding eventos by cve_events:', error);
      return {
        success: false,
        message: 'Error al buscar los eventos',
        data: null
      };
    }
  }
  
}
