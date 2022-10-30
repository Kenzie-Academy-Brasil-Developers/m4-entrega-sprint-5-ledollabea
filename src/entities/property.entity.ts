import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Address } from "./address.entity";
import { Category } from "./categories.entity";
import { Schedule } from "./schedules_users_properties.entity";

@Entity("properties")
class Property {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  sold: boolean;

  @Column("decimal", { precision: 10, scale: 2 })
  value: number;

  @Column("integer", { nullable: false })
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne((type) => Address, {
    eager: true,
  })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Schedule, schedule => schedule.property) schedule: Schedule;
  
  @ManyToOne(() => Category) category: Category;

}

export { Property };
