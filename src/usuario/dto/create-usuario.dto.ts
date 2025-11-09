// ...existing code...
import { IsString, IsOptional, IsEmail, Length, IsDateString, IsIn, IsBoolean, IsUUID } from 'class-validator';

export class CreateUsuarioDto {
  @IsOptional()
  @IsUUID()
  usuarioUUID?: string;

  @IsOptional()
  @IsString()
  @Length(8, 50)
  nombreUsuario?: string;

  @IsOptional()
  @IsString()
  @Length(8, 255)
  contrasenia?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  nombre?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  apellidos?: string;

  @IsOptional()
  @IsEmail()
  @Length(5, 100)
  correoElectronico?: string;

  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;

  @IsOptional()
  @IsString()
  @Length(0, 15)
  telefono?: string;

  @IsOptional()
  @IsIn(['A', 'I', 'C'])
  usuarioEstatus?: 'A' | 'I' | 'C';

  @IsOptional()
  @IsString()
  @Length(0, 20)
  usuarioAlta?: string;

  @IsOptional()
  @IsDateString()
  fechaAlta?: string;

  @IsOptional()
  @IsString()
  @Length(0, 20)
  usuarioModificacion?: string;

  @IsOptional()
  @IsDateString()
  fechaModificacion?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}