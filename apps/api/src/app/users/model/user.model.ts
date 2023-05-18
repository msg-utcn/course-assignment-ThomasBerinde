import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserRoleModel} from "./user-role.model";
import {QuestionModel} from "../../question-management/model/question.model";

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({nullable: false})
  name: string

  @Column({nullable: false})
  email: string

  @Column({nullable: false, enum: UserRoleModel, type: 'enum'})
  roles: UserRoleModel[]

  @Column({nullable: false})
  password: string

  @OneToMany(() => QuestionModel, question => question.postedBy)
  questions: QuestionModel[];

  constructor(values: Partial<UserModel>) {
    if (values) {
      this.id = values.id;
      this.name = values.name;
      this.email = values.email;
      this.roles = values.roles;
      this.password = values.password;
      this.questions = values.questions;
    }
  }
}
