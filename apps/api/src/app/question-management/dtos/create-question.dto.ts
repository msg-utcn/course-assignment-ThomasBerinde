import {QuestionTopic} from "../model/question-topic";

export class CreateQuestionDto {
  title: string;
  content: string;
  topic: QuestionTopic;
}
