import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 128})
  district: string;

  @Column({length: 8})
  zipCode: string;

  @Column({length: 128})
  number: string;
  
  @Column({length: 128})
  city: string;

  @Column({length: 2})
  state: string;
}

export { Address };