import { Injectable } from '@nestjs/common';
import { CreateCustomCalendarDto } from './dto/create-custom-calendar.dto';
import { UpdateCustomCalendarDto } from './dto/update-custom-calendar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomCalendar } from './entities/custom-calendar.entity';
import { Repository } from 'typeorm';
import { UsuarioService } from 'src/usuario2/usuario.service';

@Injectable()
export class CustomCalendarService {

  constructor(
    @InjectRepository(CustomCalendar)
    private _customCalendarRepository: Repository<CustomCalendar>,
    private readonly _usuarioService: UsuarioService,
  ) {}

  async createNewCustomCalendar(createCustomCalendarDto: CreateCustomCalendarDto) {

    try {

    const usuario = await this._usuarioService.findStatusByUuidValidationGeneral(createCustomCalendarDto.uuid_user);
    if(!usuario.success){
      return {
        success: false,
        message: usuario.message,
        data: null
      };
    }

    if(!createCustomCalendarDto.calendar_name || !createCustomCalendarDto.uuid_user ) {
      return {
        success: false,
        message: 'El nombre del calendario y uuid de usuario es requerido',
        data: null
      };
    }

    const customCalendarExist = await this.findByUuidUserAndCalendarName(createCustomCalendarDto.uuid_user, createCustomCalendarDto.calendar_name);
    if(customCalendarExist.success){
      return {
        success: false,
        message: 'Ya existe un calendario con ese nombre para este usuario',
        data: null
      };
    }

    const countCalendars = await this.countCalendarsByUuidUser(createCustomCalendarDto.uuid_user);
    if(countCalendars.data >= 5){
      return {
        success: false,
        message: 'Ya tienes 5 calendarios personalizados creados, no puedes crear más',
        data: null
      };
    }    

    let cveCalendar = this.generateCalendarCode();

    const existCveCalendar = await this._customCalendarRepository.findOne({
      where: {
        cve_calendar: cveCalendar
      }
    });

    if(existCveCalendar) {
      cveCalendar = this.generateCalendarCode();
    }

    createCustomCalendarDto.cve_calendar = this.generateCalendarCode();

    const customCalendar = await this._customCalendarRepository.save(createCustomCalendarDto);
    if(!customCalendar) {
      return {
        success: false,
        message: 'Error al crear el calendario',
        data: null
      };
    }

    return {
      success: true,
      message: 'Calendario creado correctamente',
      data: createCustomCalendarDto
    };

    } catch (error) {
      console.error('Error creating customCalendar:', error);
    }
    
  }

  async findByUuidUserAndCalendarName(uuid_user: string, calendar_name: string) {

    try {

      if(!uuid_user || !calendar_name){
        return {
          success: false,
          message: 'El uuid_user y el calendar_name son requeridos',
          data: null
        };
      }

      const customCalendar = await this._customCalendarRepository.findOne({
        where: {
          uuid_user: uuid_user,
          calendar_name: calendar_name
        }
      });

      if(customCalendar) {
        return {
          success: true,
          message: 'Calendario encontrado con ese nombre para este usuario',
          data: null
        };
      }

      return {
        success: false,
        message: 'Calendario disponible',
        data: customCalendar
      };
      
    }catch (error) {
      console.error('Error finding customCalendar:', error);
    }
    
  }

  async countCalendarsByUuidUser(uuid_user: string) {
    try {

      if(!uuid_user){
        return {
          success: false,
          message: 'El uuid_user es requerido',
          data: null
        };
      }

      const count = await this._customCalendarRepository.count({
        where: {
          uuid_user: uuid_user
        }
      });

      return {
        success: true,
        message: 'Cantidad de calendarios encontrados',
        data: count
      };

    }catch (error) {
      console.error('Error counting customCalendars:', error);
    }
    
  }

  async findByUuidUser(uuid_user: string) {
    try {

      if(!uuid_user){
        return {
          success: false,
          message: 'El uuid_user es requerido',
          data: null
        };
      }

      const customCalendars = await this._customCalendarRepository.find({
        where: {
          uuid_user: uuid_user
        }
      });

      if(!customCalendars.length) {
        return {
          success: false,
          message: 'No se encontraron calendarios para este usuario',
          data: null
        };
      }

      return {
        success: true,
        message: 'Calendarios encontrados',
        data: customCalendars
      };

    }catch (error) {
      console.error('Error finding customCalendars:', error);
    }
    
  }

  generateCalendarCode(): string {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
  }

  async findByCveCalendar(cve_calendar: string) {
    try {

      if(!cve_calendar){
        return {
          success: false,
          message: 'El cve_calendar es requerido',
          data: null
        };
      }

      const customCalendar = await this._customCalendarRepository.findOne({
        where: {
          cve_calendar: cve_calendar
        }
      });

      if(!customCalendar) {
        return {
          success: false,
          message: 'No se encontró el calendario',
          data: null
        };
      }

      return {
        success: true,
        message: 'Calendario encontrado',
        data: customCalendar
      };

    }catch (error) {
      console.error('Error finding customCalendar:', error);
    }
    
  }
  
}
