import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserRole} from "./user-role.model";

@Entity()
export class UsersModel {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({nullable: false})
  name: string

  @Column({nullable: false})
  email: string

  @Column({nullable: false, enum: UserRole, type: 'enum'})
  roles: UserRole[]

  @Column({nullable: false})
  password: string

  constructor(values: Partial<UsersModel>) {
    if (values) {
      this.id = values.id;
      this.name = values.name;
      this.email = values.email;
      this.roles = values.roles;
      this.password = values.password;
    }
  }
}
