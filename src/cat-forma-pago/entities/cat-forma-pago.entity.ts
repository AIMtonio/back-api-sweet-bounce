import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('CatFormaPago')
export class CatFormaPago {
  @PrimaryGeneratedColumn({ name: 'CatFormaPagoID', type: 'int' })
  catFormaPagoID: number;

  @Column({ name: 'Nombre', type: 'varchar', length: 20 })
  nombre: string;

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