import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('evento')
export class Evento {
  @PrimaryGeneratedColumn({ name: 'id_event' })
  id_event: number;

  @Column({ name: 'cve_event', type: 'varchar', length: 10, nullable: true })
  cve_event: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, name: 'date_event', nullable: true })
  date_event: string;

  @Column({ type: 'varchar', length: 50, default: 1, nullable: true })
  status: string;

  @Column({ type: 'char', length: 36, name: 'uuid_user', nullable: false })
  uuid_user: string;

  @CreateDateColumn({ name: 'create_at', type: 'datetime', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)' })
  create_at: Date;

  @Column({ type: 'varchar', length: 100, name: 'create_by', default: 'admin', nullable: true })
  create_by: string;

  @Column({ type: 'varchar', length: 100, name: 'update_by', nullable: true })
  update_by: string;

  @UpdateDateColumn({ name: 'update_at', type: 'datetime', precision: 6, default: null, onUpdate: 'CURRENT_TIMESTAMP(6)' })
  update_at: Date;
}