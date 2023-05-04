import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserModel} from "./model/user.model";
import {UsersController} from "./users.controller";
import {UserService} from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
