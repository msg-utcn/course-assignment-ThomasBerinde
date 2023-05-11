import {BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserModel} from "./model/user.model";
import {Repository} from "typeorm";
import {UserDto} from "./dtos/user.dto";
import {UserMapper} from "./mappers/user-mapper";
import {RegisterUserDto} from "./dtos/register-user.dto";
import {LoginUserDto} from "./dtos/login-user.dto";
import bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserModel) private userModelRepository: Repository<UserModel>){}

  async readAll(): Promise<UserDto[]> {
    const foundUsers = await this.userModelRepository.find();
    if (!foundUsers) {
      return [];
    }
    return foundUsers.map((user) => UserMapper.mapToDto(user));
  }

  async readById(id: string): Promise<UserDto> {
    const foundUser = await this.userModelRepository.findOne({where: { id }})
    if (!foundUser) {
      throw new NotFoundException();
    }
    return UserMapper.mapToDto(foundUser);
  }

  async getUserByEmail(email: string): Promise<UserDto> {
    const foundUser = await this.userModelRepository.findOneBy({email});
    if (!foundUser) {
      throw new NotFoundException();
    }
    return UserMapper.mapToDto(foundUser);
  }

  async create(dto: RegisterUserDto): Promise<UserDto> {
    let user = undefined
    try {
      user = await UserMapper.mapRegisterUserToModel(dto);
    } catch (error) {
      Logger.log(error, 'UserService.create')
      throw new InternalServerErrorException();
    }
    try {
      const savedUser = await this.userModelRepository.save(user);
      return UserMapper.mapToDto(savedUser);
    } catch (error) {
      Logger.log(error, 'UserService.create');
      throw new BadRequestException();
    }
  }

  async checkCredentials(loginUserDto: LoginUserDto): Promise<boolean> {
    const foundModel = await this.userModelRepository.findOneBy({email: loginUserDto.email})
    if (!foundModel) {
      return false;
    }
    return bcrypt.compare(loginUserDto.password, foundModel.password);
  }
}
