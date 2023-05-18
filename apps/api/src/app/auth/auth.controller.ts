import {Body, Controller, Post, Request, UseGuards, UsePipes, ValidationPipe} from "@nestjs/common";
import {ApiBody, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {AuthConfig} from "./auth.config";
import {JwtTokenDto} from "./dto/jwt-token.dto";
import {AuthService} from "./auth.service";
import {LoginUserDto} from "../users/dtos/login-user.dto";
import {RegisterUserDto} from "../users/dtos/register-user.dto";
import {UserDto} from "../users/dtos/user.dto";
import {UsersService} from "../users/users.service";
import {LocalAuthGuard} from "./guards/local-auth.guard";

// @UseGuards(LocalAuthGuard) - can be put at controller level or method level (here we use method level)
@ApiTags(AuthConfig.AUTH_SWAGGER_FEATURE)
@Controller(AuthConfig.API_ROUTE)
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({
    description: "The JWT Access Token",
    type: JwtTokenDto,
  })
  @ApiBody({type: LoginUserDto})
  async login(@Request() req): Promise<JwtTokenDto> {
    return this.authService.login(req.user);
  }

  @Post('register')
  async registerUser(@Body() dto: RegisterUserDto): Promise<UserDto> {
    return this.usersService.create(dto);
  }

}
