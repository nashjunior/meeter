import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Client } from './Client';

@Entity('persons', { schema: 'public' })
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id_person' })
  idPerson: number;

  @Column()
  name: string;

  @Column({ name: 'cpf_cnpj' })
  cpfCnpj: string;

  @OneToOne(() => Client, ({ person }) => person)
  client: Client;
}
