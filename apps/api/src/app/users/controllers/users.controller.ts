import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {API_ROUTE, USER_SWAGGER_FEATURE} from "../users.config";
import {Body, Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import {UsersService} from "../services/users.service";
import {UserDto} from "../dtos/user.dto";
import {RegisterUserDto} from "../dtos/register-user.dto";
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";

@ApiBearerAuth() // specifies that the requests must be made with a bearer token
@UseGuards(JwtAuthGuard)
@ApiTags(USER_SWAGGER_FEATURE)
@Controller(API_ROUTE)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<UserDto[]> {
    return this.userService.readAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    return this.userService.readById(id);
  }
}
