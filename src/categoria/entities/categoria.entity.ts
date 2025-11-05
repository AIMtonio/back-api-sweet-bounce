import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Categoria')
export class Categoria {
  @PrimaryGeneratedColumn({ name: 'CategoriaID', type: 'int' })
  categoriaID: number;

  @Column({ name: 'Nombre', type: 'varchar', length: 20 })
  nombre: string;

  @Column({ name: 'Descripcion', type: 'varchar', length: 30, nullable: true })
  descripcion?: string;

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