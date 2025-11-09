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
     const userExist = await this.findUserByEmail(createUsuarioDto.correoElectronico);

     if (userExist.success) {
      return {
        success: false,
        message: 'Correo ya registrado',
        //data: null,
        timestamp: new Date().toISOString(),
      };
     }
     
     const uuid_usuario = this._helperService.generateUUID();
     createUsuarioDto.usuarioUUID = uuid_usuario;

     const nombreUsuario = createUsuarioDto.correoElectronico.split('@')[0];
     createUsuarioDto.nombreUsuario = nombreUsuario;
     createUsuarioDto.contrasenia = null;
     createUsuarioDto.fechaModificacion = null; 

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
    const usuario = await this.usuarioRepository.findOne({ where: { usuarioID: id } });
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.findOne({ where: { usuarioID: id } });

    if (!usuario) {
      return 'Usuario no encontrado';
    }

    const userUpdate = await this.usuarioRepository.update(id, updateUsuarioDto);
    if (!userUpdate) {
      return 'Error al actualizar el usuario';
    }

    const updatedUsuario = await this.usuarioRepository.findOne({ where: { usuarioID: id } });
    if (!updatedUsuario) {
      return 'Error al actualizar el usuario';
    }
   
    return updatedUsuario;
  }

  async remove(id: number) {

    const usuario = await this.usuarioRepository.findOne({ where: { usuarioID: id } });
    if (!usuario) {
      return 'Usuario no encontrado';
    }

    const userDelete = await this.usuarioRepository.delete(id);
    if (!userDelete) {
      return 'Error al eliminar el usuario';
    }
   
    return 'Usuario eliminado correctamente';
  }

  async generateJwt(usuario: CreateUsuarioDto | Usuario) {
    const payload = { nombreUsuario: usuario.nombreUsuario, sub: usuario.usuarioUUID };
    return this._jwtService.sign(payload); 
  }

  async findUserByEmail(correoElectronico: string) {
    try{
      if (!correoElectronico) {
        return {
            success: false,
            message: 'Correo es requerido',
            data: null
          };
      }

      const usuario = await this.usuarioRepository.findOne({ where: { correoElectronico: correoElectronico } });
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
        data: usuario.usuarioUUID
      };
    } catch (error) {
      console.error('Error finding user by correoElectronico:', error);
      return {
        success: false,
        message: 'Error al buscar el usuario por correo',
        data: null
      };  
    }
  }

  async findByEmailAndPassword(correoElectronico: string, contrasenia: string) {
    return await this.usuarioRepository.findOne({ where: { correoElectronico: correoElectronico, contrasenia: contrasenia } });
  }

  async login(createUsuarioDto: CreateUsuarioDto | Usuario) {
    try{
      if (!createUsuarioDto.correoElectronico || !createUsuarioDto.contrasenia) {
        return {
          success: false,
          message: 'Correo y contraseña son requeridos',
          data: null
        };
      }
    
    const userExist = await this.findByEmailAndPassword(createUsuarioDto.correoElectronico, createUsuarioDto.contrasenia);
    if (!userExist) {
      return {
          success: false,
          message: 'Credenciales incorrectas',
          data: null
        };
    }

    const usuario = await this.findStatusByUuidValidationGeneral(userExist.usuarioUUID)
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
      uuid_user: userExist.usuarioUUID
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
    
      const usuario = await this.usuarioRepository.findOne({ where: { usuarioUUID: uuid } });

      if (!usuario) {
        return {
          success: false,
          message: 'Usuario no encontrado',
          timestamp: new Date().toISOString(),
        };
      }
      
      if (usuario.activo != true) {
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

      const usuario = await this.usuarioRepository.findOne({ where: { usuarioUUID: uuid } });
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
