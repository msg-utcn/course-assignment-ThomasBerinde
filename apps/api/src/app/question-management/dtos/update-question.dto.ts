import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, Matches} from "class-validator";

export class UpdateQuestionDto {
  @ApiProperty({
    description: "The title of the question",
    example: "Observer subscribe method",
    required: true
  })
  @Matches("[a-zA-Z?.; \-]{1,50}")
  title: string;
  @ApiProperty({
    description: "The content of the question",
    example: "Why is it not good to call a subscribe within another subscribe?",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
