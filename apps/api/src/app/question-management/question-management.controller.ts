import {API_ROUTE, QUESTIONS_SWAGGER_FEATURE} from './question-management.config';
import {Body, Controller, Get, Param, Post, Patch, Delete, UseGuards, Put} from '@nestjs/common';
import {QuestionDto} from './dtos/question.dto';
import {QuestionService} from "./services/question.service";
import {CreateQuestionDto} from "./dtos/create-question.dto";
import {UpdateQuestionDto} from "./dtos/update-question.dto";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AnswerDto} from "./dtos/answer.dto";
import {AnswerService} from "./services/answer.service";
import {CreateAnswerDto} from "./dtos/create-answer.dto";
import {UpdateAnswerDto} from "./dtos/update-answer.dto";
import {ApiImplicitParam} from "@nestjs/swagger/dist/decorators/api-implicit-param.decorator";

@ApiBearerAuth() // specifies that the requests must be made with a bearer token
@UseGuards(JwtAuthGuard)
@ApiTags(QUESTIONS_SWAGGER_FEATURE)
@Controller(API_ROUTE)
export class QuestionManagementController {
  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService
  ) {}

  @Get()
  async getAllQuestions(): Promise<QuestionDto[]> {
    return this.questionService.readAll();
  }

  // This endpoint must be put before "getQuestionById", since they have conflicting routes
  @Get('answers')
  async getAllAnswers(): Promise<AnswerDto[]> {
    return this.answerService.readAll();
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

  @ApiImplicitParam({name: 'answerId', type: String})  // this is for swagger
  @Get('answers/:answerId')
  async getAnswerById(@Param('answerId') answerId: string) {
    return this.answerService.readById(answerId);
  }

  @Post('answers')
  async createAnswer(@Body() dto: CreateAnswerDto): Promise<AnswerDto> {
    return this.answerService.create(dto);
  }

  @ApiImplicitParam({name: 'answerId', type: String})  // this is for swagger
  @Put('answers/:answerId')
  async updateAnswer(
    @Body() dto: UpdateAnswerDto,
    @Param('answerId') answerId: string
  ): Promise<AnswerDto> {
    return this.answerService.update(answerId, dto);
  }

  @ApiImplicitParam({name: 'answerId', type: String})  // this is for swagger
  @Delete('answers/:answerId')
  async deleteAnswer(@Param('answerId') answerId: string): Promise<void> {
    return this.answerService.delete(answerId);
  }
}
