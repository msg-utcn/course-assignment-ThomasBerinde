import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserModel} from "./model/user.model";
import {UserManagementController} from "./user-management.controller";
import {UserService} from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UserManagementController],
  providers: [UserService],
})
export class UserManagementModule {}
