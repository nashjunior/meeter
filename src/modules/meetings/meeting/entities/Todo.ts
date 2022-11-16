import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('meetings_to_do', { schema: 'public' })
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_meeting_to_do' })
  idMeetingTodo: number;

  @Column({ name: 'id_meeting' })
  idMeeting: number;

  @Column({ name: 'id_person' })
  idPerson: number;

  @Column()
  todo: string;

  @Column({ name: 'created_by' })
  createdBy: string;
}
