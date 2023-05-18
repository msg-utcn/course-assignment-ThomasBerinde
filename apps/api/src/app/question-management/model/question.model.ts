import {QuestionTopic} from './question-topic';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {AnswerModel} from "./answer.model";

@Entity()
export class QuestionModel {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column({nullable: false})
  title: string;
  @Column({nullable: true})
  postedBy: string;
  @Column({nullable: false})
  content: string;
  @Column({nullable: false, enum: QuestionTopic, type: 'enum'})
  topic: QuestionTopic;
  @Column({nullable: false})
  rating: number;
  @Column({nullable: false})
  creationDate: string;

  @OneToMany(() => AnswerModel, answer => answer.parent)
  answers?: AnswerModel[];

  constructor(values: Partial<QuestionModel>) {
    if (values) {
      this.id = values.id;
      this.title = values.title;
      this.postedBy = values.postedBy;
      this.content = values.content;
      this.topic = values.topic;
      this.rating = values.rating;
      this.creationDate = values.creationDate;
      this.answers = values.answers;
    }
  }
}
