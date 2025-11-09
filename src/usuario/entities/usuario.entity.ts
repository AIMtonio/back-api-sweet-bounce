import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type UsuarioEstatus = 'A' | 'I' | 'C';

@Entity('Usuario')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'UsuarioID', type: 'int' })
  usuarioID: number;

  @Column({ name: 'UsuarioUUID', type: 'varchar', length: 36, unique: true })
  usuarioUUID: string;

  @Column({ name: 'NombreUsuario', type: 'varchar', length: 50, nullable: true })
  nombreUsuario?: string;

  @Column({ name: 'Contrasenia', type: 'varchar', length: 255, nullable: true })
  contrasenia?: string;

  @Column({ name: 'Nombre', type: 'varchar', length: 50, nullable: true })
  nombre?: string;

  @Column({ name: 'Apellidos', type: 'varchar', length: 50, nullable: true })
  apellidos?: string;

  @Column({ name: 'CorreoElectronico', type: 'varchar', length: 100, nullable: true })
  correoElectronico?: string;

  @Column({ name: 'FechaNacimiento', type: 'date', nullable: true })
  fechaNacimiento?: Date;

  @Column({ name: 'Telefono', type: 'varchar', length: 15, nullable: true })
  telefono?: string;

  @Column({
    name: 'UsuarioEstatus',
    type: 'enum',
    enum: ['A', 'I', 'C'],
    default: 'A',
  })
  usuarioEstatus: UsuarioEstatus;

  @Column({ name: 'UsuarioAlta', type: 'varchar', length: 20, nullable: true })
  usuarioAlta?: string;

  @Column({ name: 'FechaAlta', type: 'date', nullable: true })
  fechaAlta?: Date;

  @Column({ name: 'UsuarioModificacion', type: 'varchar', length: 20, nullable: true })
  usuarioModificacion?: string;

  @Column({ name: 'FechaModificacion', type: 'date', nullable: true })
  fechaModificacion?: Date;

  @Column({ name: 'Activo', type: 'boolean', default: true })
  activo: boolean;
}
