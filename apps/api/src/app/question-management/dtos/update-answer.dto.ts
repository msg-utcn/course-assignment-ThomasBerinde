import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class UpdateAnswerDto {
  @ApiProperty({
    description: "The content of the answer",
    example: "Annotations are directives for the compiler to inject certain properties",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  content: string
}
