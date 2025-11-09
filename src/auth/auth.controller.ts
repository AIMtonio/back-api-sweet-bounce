import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async create(@Body() createUserDto: CreateUsuarioDto) {
    const token = await this.authService.generateJwt(createUserDto);
    // return { user: userExist, access_token: token, token_type: "bearer" };
    return { access_token: token, token_type: "bearer" };
  }
 
}
