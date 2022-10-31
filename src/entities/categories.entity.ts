import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Property } from "./property.entity";

@Entity("categories")
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true, length: 128})
  name: string;

  @OneToMany(() => Property, property => property.category) properties: Property[]
}

export { Category };