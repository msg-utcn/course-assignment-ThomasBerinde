import {API_ROUTE, QUESTIONS_SWAGGER_FEATURE} from './question-management.config';
import {Body, Controller, Get, Param, Post, Patch, Delete} from '@nestjs/common';
import {QuestionDto} from './dtos/question.dto';
import {QuestionService} from "./question.service";
import {CreateQuestionDto} from "./dtos/create-question.dto";
import {UpdateQuestionDto} from "./dtos/update-question.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags(QUESTIONS_SWAGGER_FEATURE)
@Controller(API_ROUTE)
export class QuestionManagementController {
  constructor(
    private questionService: QuestionService
  ) {
  }

  @Get()
  async getAllQuestions(): Promise<QuestionDto[]> {
    return this.questionService.readAll();
  }

  @Get(':id')
  async getQuestionById(@Param('id') id: string): Promise<QuestionDto> {
    return this.questionService.readById(id);
  }

  @Post()
  async createQuestion(@Body() dto: CreateQuestionDto): Promise<QuestionDto> {
    return this.questionService.create(dto);
  }

  @Patch(':id')
  async updateQuestion(@Param('id') id: string, @Body() dto: UpdateQuestionDto): Promise<QuestionDto> {
    return this.questionService.update(id, dto);
  }

  @Delete(":id")
  async deleteQuestion(@Param('id') id: string) {
    return this.questionService.delete(id);
  }
}
