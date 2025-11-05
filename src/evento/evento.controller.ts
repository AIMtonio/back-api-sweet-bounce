import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventoService } from './evento.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';

@Controller('evento')
export class EventoController {

  constructor(
    private readonly eventoService: EventoService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('new')
  async create(@Body() createEventoDto: CreateEventoDto) {
    return await this.eventoService.create(createEventoDto);
  }

  @Get()
  async findAll() {
    return await this.eventoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('findMyEvents')
  async findByClient(@Body() createEventoDto: CreateEventoDto) {
    return await this.eventoService.findByClient(createEventoDto);
  }



}
