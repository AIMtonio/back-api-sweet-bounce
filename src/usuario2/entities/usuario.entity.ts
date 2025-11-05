import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('usuario222')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_user' })
  id_user: number;

  @Column({ type: 'char', length: 36, nullable: false })
  uuid_user: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 2, default: '2', nullable: true })
  status: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'date', name: 'brd_date', nullable: true })
  brdDate: Date;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  lastname: string;

  @Column({ type: 'varchar', length: 100, name: 'create_by', default: 'admin' })
  create_by: string;

  @CreateDateColumn({ name: 'create_at', type: 'datetime' })
  create_at: Date;

  @Column({ type: 'varchar', length: 100, name: 'update_by', nullable: true })
  update_by: string;

  @UpdateDateColumn({ name: 'update_at', type: 'datetime', nullable: true })
  update_at: Date;
}