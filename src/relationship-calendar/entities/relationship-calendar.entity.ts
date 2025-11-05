import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('relationship_calendar')
export class RelationshipCalendar {
  @PrimaryGeneratedColumn({ name: 'id_relationship_calendar' })
  id: number;

  @Column({ name: 'uuid_user_create', type: 'varchar', length: 36, nullable: true })
  uuid_user_create: string;

  @Column({ name: 'uuid_user_relationship', type: 'varchar', length: 36, nullable: true })
  uuid_user_relationship: string;

  @Column({ name: 'status', type: 'varchar', length: 2, default: '1', nullable: true })
  status: string;

  @Column({ name: 'cve_calendar', type: 'varchar', length: 10, nullable: true })
  cve_calendar: string;

  @CreateDateColumn({ name: 'create_at', type: 'datetime', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)' })
  create_at: Date;

  @Column({ name: 'create_by', type: 'varchar', length: 100, default: 'admin', nullable: true })
  create_by: string;

  @Column({ name: 'update_by', type: 'varchar', length: 100, nullable: true })
  update_by: string;

  @UpdateDateColumn({ name: 'update_at', type: 'datetime', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  update_at: Date;
}