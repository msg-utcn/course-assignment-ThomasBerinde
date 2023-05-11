import {UserRoleModel} from "../model/user-role.model";
import {ApiProperty} from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({
    description: "The id of the user",
    example: "ece24a1c-515c-4c98-937c-11c24a9dfba5",
    required: true
  })
  id?: string;
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
    description: "The roles of the user",
    example: "[USER]",
    required: true
  })
  roles: UserRoleModel[]

  constructor(values: Partial<UserDto>) {
    if (values) {
      this.id = values.id;
      this.name = values.name;
      this.email = values.email;
      this.roles = values.roles;
    }
  }
}
