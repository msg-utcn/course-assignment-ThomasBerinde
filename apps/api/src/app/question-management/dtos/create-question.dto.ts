import {QuestionTopic} from "../model/question-topic";
import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsString, Matches} from "class-validator";

export class CreateQuestionDto {
  @ApiProperty({
    description: "The title of the question",
    example: "Why am I here?",
    required: true,
  })
  @Matches("[a-zA-Z?.; \-]{1,50}")
  title: string;
  @ApiProperty({
    description: "The content of the question",
    example: "Idk",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  content: string;
  @ApiProperty({
    description: "The topic of the question",
    enum: QuestionTopic,
    example: QuestionTopic.JavaScript,
    required: true,
  })
  @IsEnum(QuestionTopic)
  topic: QuestionTopic;
}
