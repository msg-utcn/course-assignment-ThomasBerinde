import {RegisterUserDto} from "../dtos/register-user.dto";
import {UserModel} from "../model/user.model";
import {UserRoleModel} from "../model/user-role.model";
import {UserDto} from "../dtos/user.dto";
import bcrypt from 'bcrypt';

export class UserMapper {
  static async mapRegisterUserToModel(dto: RegisterUserDto): Promise<UserModel> {
    return new UserModel({
      id: undefined,
      name: dto.name,
      email: dto.email,
      roles: [UserRoleModel.USER],
      password: await bcrypt.hash(dto.password, await bcrypt.genSalt(10))
    })
  }

  static mapToDto(model: UserModel): UserDto {
    return new UserDto({
      id: model.id,
      name: model.name,
      email: model.email,
      roles: model.roles
    })
  }
}
