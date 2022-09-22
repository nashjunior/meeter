import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('meetings', { schema: 'public' })
export class Meeting extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id_meeting' })
  idMeeting: number;

  @Column('numeric')
  lat: number;

  @Column('numeric')
  long: number;

  @Column()
  name: string;

  @Column('timestamp')
  start: Date;

  @Column('timestamp')
  end: Date;

  @Column()
  description?: string;

  @Column({ name: 'created_by' })
  createdBy: string;
}
