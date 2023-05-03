import { API_ROUTE } from './question-management.config';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuestionDto } from './dtos/question.dto';
import { Repository } from 'typeorm';
import { QuestionModel } from './model/question.model';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionTopic } from './model/question-topic';

@Controller(API_ROUTE)
export class QuestionManagementController {
  constructor(
    @InjectRepository(QuestionModel)
    private questionModelRepository: Repository<QuestionModel>
  ) {}

  @Get()
  async getAllQuestions(): Promise<QuestionDto[]> {
    return this.questionModelRepository.find();
  }

  @Get(':id')
  async getQuestionById(@Param('id') id: string): Promise<QuestionDto> {
    return this.questionModelRepository.findOneBy({ id: id });
  }

  @Post()
  async createQuestion(@Body() question: QuestionDto): Promise<QuestionDto> {
    return this.questionModelRepository.save(
      new QuestionModel({
        id: undefined,
        title: 'test',
        postedBy: 'ion',
        rating: 0,
        creationDate: new Date().toISOString(),
        topic: QuestionTopic.JavaScript,
        content: 'Hello there General Kenobi',
      })
    );
  }
}
