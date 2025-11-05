import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUsuarioDto } from 'src/usuario2/dto/create-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario2/entities/usuario.entity';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario2/usuario.service';

@Injectable()
export class AuthService {

  constructor(
      @InjectRepository(Usuario)
      private _usuarioRepository: Repository<Usuario>,
      private readonly _jwtService: JwtService,
      private readonly usuarioService: UsuarioService,
    ) {}

  async generateJwt(usuario: CreateUsuarioDto) {
    const payload = { username: 'hola', sub: 'mundo' };
    return this._jwtService.sign(payload);
  }

}
