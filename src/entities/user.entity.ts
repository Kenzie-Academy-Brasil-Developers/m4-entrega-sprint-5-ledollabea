import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Schedule } from "./schedules_users_properties.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 128})
  name: string;

  @Column({length: 128, unique: true})
  email: string;

  @Column({length: 128})
  password: string;

  @Column()
  isAdm: boolean;

  @Column({default: true})
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Schedule, schedule => schedule.user) schedules: Schedule[]
}

export { User };