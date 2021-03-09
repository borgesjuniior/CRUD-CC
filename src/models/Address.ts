import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import User from './User';

@Entity('address')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({name: 'user_id'})
  user: string;

  @Column()
  address: string;

  @Column()
  number: number;

  @Column()
  complement: string;

  @Column()
  cep: string;

  @Column()
  city: string;

  @Column()
  estate: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

}

export default Address;
