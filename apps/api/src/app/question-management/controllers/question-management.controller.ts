import {API_ROUTE, QUESTIONS_SWAGGER_FEATURE} from '../question-management.config';
import {Body, Controller, Get, Param, Post, Patch, Delete, UseGuards, Put, Request} from '@nestjs/common';
import {QuestionDto} from '../dtos/question.dto';
import {QuestionService} from "../services/question.service";
import {CreateQuestionDto} from "../dtos/create-question.dto";
import {UpdateQuestionDto} from "../dtos/update-question.dto";
import {ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {AnswerDto} from "../dtos/answer.dto";
import {AnswerService} from "../services/answer.service";
import {CreateAnswerDto} from "../dtos/create-answer.dto";
import {UpdateAnswerDto} from "../dtos/update-answer.dto";
import {ApiImplicitParam} from "@nestjs/swagger/dist/decorators/api-implicit-param.decorator";
import {LocalAuthGuard} from "../../auth/guards/local-auth.guard";
import {JwtTokenDto} from "../../auth/dto/jwt-token.dto";
import {LoginUserDto} from "../../users/dtos/login-user.dto";

@ApiBearerAuth() // specifies that the requests must be made with a bearer token
@UseGuards(JwtAuthGuard)
@ApiTags(QUESTIONS_SWAGGER_FEATURE)
@Controller(API_ROUTE)
export class QuestionManagementController {
  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService
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
  async createQuestion(@Request() req, @Body() dto: CreateQuestionDto): Promise<QuestionDto> {
    return this.questionService.create(req.user.id, dto);
  }

  @Patch(':id')
  async updateQuestion(@Param('id') id: string, @Body() dto: UpdateQuestionDto): Promise<QuestionDto> {
    return this.questionService.update(id, dto);
  }

  @Delete(":id")
  async deleteQuestion(@Param('id') id: string) {
    return this.questionService.delete(id);
  }

  @Get(':questionId/answers')
  async getAllAnswers(@Param('questionId') questionId: string): Promise<AnswerDto[]> {
    return this.answerService.readAllByQuestionId(questionId);
  }

  @ApiImplicitParam({name: 'answerId', type: String})  // this is for swagger
  @Get('answers/:answerId')
  async getAnswerById(@Param('answerId') answerId: string) {
    return this.answerService.readById(answerId);
  }

  @Post(':questionId/answers')
  async createAnswer(@Param('questionId') questionId: string,
                     @Body() dto: CreateAnswerDto): Promise<AnswerDto> {
    return this.answerService.create(questionId, dto);
  }

  @ApiImplicitParam({name: 'questionId', type: String})  // this is for swagger
  @ApiImplicitParam({name: 'answerId', type: String})
  @Put(':questionId/answers/:answerId')
  async updateAnswer(
    @Param('answerId') answerId: string,
    @Body() dto: UpdateAnswerDto,
  ): Promise<AnswerDto> {
    return this.answerService.update(answerId, dto);
  }

  @ApiImplicitParam({name: 'questionId', type: String})  // this is for swagger
  @ApiImplicitParam({name: 'answerId', type: String})
  @Delete(':questionId/answers/:answerId')
  async deleteAnswer(@Param('answerId') answerId: string): Promise<void> {
    return this.answerService.delete(answerId);
  }
}
