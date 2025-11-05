import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('events_relationship')
export class EventsRelationship {
  @PrimaryGeneratedColumn({ name: 'id_events_relationship' })
  id: number;

  @Column({ name: 'cve_calendar', type: 'varchar', length: 10, nullable: true })
  cve_calendar: string;

  @Column({ name: 'cve_event', type: 'varchar', length: 10, nullable: true })
  cve_event: string;

  @Column({ name: 'status', type: 'varchar', length: 2, default: '1', nullable: true })
  status: string;

  @CreateDateColumn({ name: 'create_at', type: 'datetime', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)' })
  create_at: Date;

  @Column({ name: 'create_by', type: 'varchar', length: 100, default: 'admin', nullable: true })
  create_by: string;

  @Column({ name: 'update_by', type: 'varchar', length: 100, nullable: true })
  update_by: string;

  @UpdateDateColumn({ name: 'update_at', type: 'datetime', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  update_at: Date;
}