import { IsString, IsOptional, IsNotEmpty, Length, IsBoolean, IsDateString } from 'class-validator';

export class CreateCatFormaPagoDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  nombre: string;

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