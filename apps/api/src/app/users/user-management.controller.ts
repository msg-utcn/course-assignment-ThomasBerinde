import {ApiTags} from "@nestjs/swagger";
import {API_ROUTE, USER_SWAGGER_FEATURE} from "./user-management.config";
import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserDto} from "./dtos/user.dto";
import {RegisterUserDto} from "./dtos/register-user.dto";

@ApiTags(USER_SWAGGER_FEATURE)
@Controller(API_ROUTE)
export class UserManagementController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserDto[]> {
    return this.userService.readAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    return this.userService.readById(id);
  }

  @Post()
  async registerUser(@Body() dto: RegisterUserDto): Promise<UserDto> {
    return this.userService.create(dto);
  }
}
