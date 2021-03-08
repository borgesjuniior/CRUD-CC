import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('address')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @Column()
  cep: number;

  @Column()
  city: number;

  @Column()
  estate: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

}

export default Address;
