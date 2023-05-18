import { Module } from '@nestjs/common';
import { QuestionManagementController } from './controllers/question-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModel } from './model/question.model';
import {QuestionService} from "./services/question.service";
import {AnswerService} from "./services/answer.service";
import {AnswerModel} from "./model/answer.model";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionModel, AnswerModel])],
  controllers: [QuestionManagementController],
  providers: [QuestionService, AnswerService],
})
export class QuestionManagementModule {}
