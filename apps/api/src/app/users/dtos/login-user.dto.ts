import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsStrongPassword} from "class-validator";

export class LoginUserDto {
  @ApiProperty( {
    description: 'The email of the user',
    example: "alle@gmail.com",
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty( {
    description: 'The password of the user',
    example: "alle",
    required: true,
  })
  //@IsStrongPassword()
  password: string;

  constructor(values: Partial<LoginUserDto>) {
    if (values) {
      this.email = values.email;
      this.password = values.password;
    }
}
}
