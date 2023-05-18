import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class AnswerModel {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({nullable: false})
  content: string;

  @Column({nullable: false})
  rating?: number;

  @Column({ type: "date", nullable: false})
  creationDate: Date;

  constructor(values: Partial<AnswerModel>) {
    if (values) {
      this.id = values.id;
      this.content = values.content;
      this.rating = values.rating;
      this.creationDate = values.creationDate;
    }
  }
}
