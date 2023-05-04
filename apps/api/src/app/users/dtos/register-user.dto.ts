import {ApiProperty} from "@nestjs/swagger";

export class RegisterUserDto {
  @ApiProperty({
    description: "The name of the user",
    example: "Thomas",
    required: true
  })
  name: string
  @ApiProperty({
    description: "The email of the user",
    example: "thomas.berinde.99@gmail.com",
    required: true
  })
  email: string
  @ApiProperty({
    description: "The password of the user",
    example: "thomas",
    required: true
  })
  password: string

  constructor(values: Partial<RegisterUserDto>) {
    if (values) {
      this.name = values.name;
      this.email = values.email;
      this.password = values.password
    }
  }
}
