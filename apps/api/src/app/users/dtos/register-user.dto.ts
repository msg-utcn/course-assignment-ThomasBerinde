import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsStrongPassword, Matches} from "class-validator";

export class RegisterUserDto {
  @ApiProperty({
    description: "The name of the user",
    example: "Thomas",
    required: true
  })
  @Matches("[a-zA-Z '.\-]{3,50}")
  name: string
  @ApiProperty({
    description: "The email of the user",
    example: "thomas.berinde.99@gmail.com",
    required: true
  })
  @IsEmail()
  email: string
  @ApiProperty({
    description: "The password of the user",
    example: "thomas",
    required: true
  })
  //@IsStrongPassword()
  password: string

  constructor(values: Partial<RegisterUserDto>) {
    if (values) {
      this.name = values.name;
      this.email = values.email;
      this.password = values.password
    }
  }
}
