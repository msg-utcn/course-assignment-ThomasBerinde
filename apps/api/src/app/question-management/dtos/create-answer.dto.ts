import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateAnswerDto {
  @ApiProperty({
    description: "The content of the answer",
    example: "A placeholder for a value that will be available in the future",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
