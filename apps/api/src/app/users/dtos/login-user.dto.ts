import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty( {
    description: 'The email of the user',
    required: true,
  })
  email: string;

  @ApiProperty( {
    description: 'The password of the user',
    required: true,
  })
  password: string;

  constructor(values: Partial<LoginUserDto>) {
    if (values) {
      this.email = values.email;
      this.password = values.password;
    }
}
}
