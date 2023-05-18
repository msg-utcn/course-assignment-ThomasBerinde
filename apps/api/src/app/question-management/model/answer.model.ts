import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {QuestionModel} from "./question.model";

@Entity()
export class AnswerModel {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @ManyToOne(() => QuestionModel, question => question.answers, {
    nullable: false,
    cascade: true,
  })
  parent: QuestionModel;

  @Column({nullable: false})
  content: string;

  @Column({nullable: false})
  rating?: number;

  @Column({type: "date", nullable: false})
  creationDate: Date;

  constructor(values: Partial<AnswerModel>) {
    if (values) {
      this.id = values.id;
      this.parent = values.parent
      this.content = values.content;
      this.rating = values.rating;
      this.creationDate = values.creationDate;
    }
  }
}
