import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  //@UseGuards(JwtAuthGuard)
  @Post('new')
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return await this.usuarioService.create(createUsuarioDto);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUsuarioDto) {
    console.log('UsuarioController - login - createUserDto:', createUserDto);
    return await this.usuarioService.login(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('validateUserByCustomCalendar') 
  async validateUserByCustomCalendar(@Body() createUserDto: CreateUsuarioDto) {
    return await this.usuarioService.findUserByEmail(createUserDto.correoElectronico);
  }

}
