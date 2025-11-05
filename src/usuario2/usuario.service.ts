import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { HelpersService } from 'src/helpers/helpers.service';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly _jwtService: JwtService,
    private readonly _helperService: HelpersService,
  ) {}
  
  async create(createUsuarioDto: CreateUsuarioDto) {

    try{
     const userExist = await this.findUserByEmail(createUsuarioDto.email);

     if (userExist.success) {
      return {
        success: false,
        message: 'Correo ya registrado',
        //data: null,
        timestamp: new Date().toISOString(),
      };
     }
     
     const uuid_usuario = this._helperService.generateUUID();
     createUsuarioDto.uuid_user = uuid_usuario;

     const username = createUsuarioDto.email.split('@')[0];
     createUsuarioDto.username = username;
     createUsuarioDto.password = null;
     createUsuarioDto.update_at = null; 

    const usuario = await this.usuarioRepository.save(createUsuarioDto);

    return {
      success: true,
      message: 'Usuario creado con éxito',
      data: usuario,
      timestamp: new Date().toISOString(),
    };

    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }

  }

  async findAll() {
    const usuarios = await this.usuarioRepository.find();
    return usuarios;
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({ where: { id_user: id } });
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.findOne({ where: { id_user: id } });

    if (!usuario) {
      return 'Usuario no encontrado';
    }

    const userUpdate = await this.usuarioRepository.update(id, updateUsuarioDto);
    if (!userUpdate) {
      return 'Error al actualizar el usuario';
    }

    const updatedUsuario = await this.usuarioRepository.findOne({ where: { id_user: id } });
    if (!updatedUsuario) {
      return 'Error al actualizar el usuario';
    }
   
    return updatedUsuario;
  }

  async remove(id: number) {

    const usuario = await this.usuarioRepository.findOne({ where: { id_user: id } });
    if (!usuario) {
      return 'Usuario no encontrado';
    }

    const userDelete = await this.usuarioRepository.delete(id);
    if (!userDelete) {
      return 'Error al eliminar el usuario';
    }
   
    return 'Usuario eliminado correctamente';
  }

  async generateJwt(usuario: CreateUsuarioDto) {
    const payload = { username: usuario.username, sub: usuario.uuid_user
     };
    return this._jwtService.sign(payload);
  }

  async findUserByEmail(email: string) {
    try{
      if (!email) {
        return {
            success: false,
            message: 'Correo es requerido',
            data: null
          };
      }

      const usuario = await this.usuarioRepository.findOne({ where: { email: email } });
      if (!usuario) {
        return {
            success: false,
            message: 'Usuario no encontrado',
            data: null
          };
      }

      // if (usuario.status != '1') {
      //   return {
      //       success: false,
      //       message: 'Usuario inactivo',
      //       data: null
      //     };
      // }

      return {
        success: true,
        message: 'Usuario encontrado',
        data: usuario.uuid_user
      };
    } catch (error) {
      console.error('Error finding user by email:', error);
      return {
        success: false,
        message: 'Error al buscar el usuario por correo',
        data: null
      };  
    }
  }

  async findByEmailAndPassword(email: string, password: string) {
    return await this.usuarioRepository.findOne({ where: { email: email, password: password } });
  }

  async login(createUsuarioDto: CreateUsuarioDto) {
    try{
      if (!createUsuarioDto.email || !createUsuarioDto.password) {
        return {
          success: false,
          message: 'Correo y contraseña son requeridos',
          data: null
        };
      }
    
    const userExist = await this.findByEmailAndPassword(createUsuarioDto.email, createUsuarioDto.password);
    if (!userExist) {
      return {
          success: false,
          message: 'Credenciales incorrectas',
          data: null
        };
    }

    const usuario = await this.findStatusByUuidValidationGeneral(userExist.uuid_user)
    if(!usuario.success){
      return {
        success: false,
        message: usuario.message,
        data: null
      };
    }

    const token = await this.generateJwt(userExist);
    return {
      success: true,
      message: 'Login successful',
      data: token,
      uuid_user: userExist.uuid_user
    };
    
    }catch (error) {
      console.error('Error in login:', error);
    }
    
  }

  async findStatusByUuidValidationGeneral(uuid: string) {

    try {

      if (!uuid) {
        return {
          success: false,
          message: 'El uuid es obligatorio',
          data: null
        };
      }
    
      const usuario = await this.usuarioRepository.findOne({ where: { uuid_user: uuid } });

      if (!usuario) {
        return {
          success: false,
          message: 'Usuario no encontrado',
          timestamp: new Date().toISOString(),
        };
      }
      
      if (usuario.status != '1') {
        return {
          success: false,
          message: 'Usuario inactivo',
          timestamp: new Date().toISOString(),
        };
      }
      
      return {
          success: true,
          message: 'Validacion correcta',
          data: usuario,
          timestamp: new Date().toISOString(),
        }; 

    }catch (error) {
      console.error('Error in findStatusByUuid:', error);
    }
  }

  async findByUuid(uuid: string) {
    try {
      if (!uuid) {
        return {
          success: false,
          message: 'El uuid es obligatorio',
          data: null
        };
      }

      const usuario = await this.usuarioRepository.findOne({ where: { uuid_user: uuid } });
      if (!usuario) {
        return {
          success: false,
          message: 'Usuario no encontrado',
          data: null
        };
      }

      return {
        success: true,
        message: 'Usuario encontrado',
        data: usuario
      };

    } catch (error) {
      console.error('Error finding user by UUID:', error);
      return {
        success: false,
        message: 'Error al buscar el usuario',
        data: null
      };
    }
  }

}
