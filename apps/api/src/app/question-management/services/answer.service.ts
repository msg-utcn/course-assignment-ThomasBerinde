import {BadRequestException, Inject, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AnswerModel} from "../model/answer.model";
import {AnswerDto} from "../dtos/answer.dto";
import {AnswerMapper} from "../mappers/answer.mapper";
import {UpdateAnswerDto} from "../dtos/update-answer.dto";
import {CreateAnswerDto} from "../dtos/create-answer.dto";
import {QuestionModel} from "../model/question.model";

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(AnswerModel)
    private answerModelRepository: Repository<AnswerModel>,
    @InjectRepository(QuestionModel)
    private questionModelRepository: Repository<QuestionModel>
  ) {
  }

  async readById(id: string): Promise<AnswerDto> {
    let foundModel = null;
    try {
      foundModel = await this.answerModelRepository.findOne({
        where: {id},
        relations: ['parent'] ,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    if (!foundModel) {
      throw new NotFoundException();
    }
    return AnswerMapper.mapToDto(foundModel);
  }

  async readAllByQuestionId(questionId: string): Promise<AnswerDto[]> {
    const foundModels = await this.answerModelRepository.find({
      where: {parent: {id : questionId } },
      relations: ['parent']   // this specifies that the Question of the Answer should be loaded as well
    });
    if (!foundModels) {
      return []
    }
    return foundModels.map((model) => AnswerMapper.mapToDto(model))
  }

  async create(questionId: string, dto: CreateAnswerDto): Promise<AnswerDto> {
    const foundQuestion = await this.questionModelRepository.findOneBy({id: questionId})
    if (!foundQuestion) {
      throw new BadRequestException();
    }
    try {
      const mappedModel = AnswerMapper.mapCreateAnswerToModel(dto, foundQuestion);
      const savedModel = await this.answerModelRepository.save(mappedModel);
      return AnswerMapper.mapToDto(savedModel);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, dto: UpdateAnswerDto): Promise<AnswerDto> {
    const foundAnswer = await this.answerModelRepository.findOne({
      where: {id},
      relations: ['parent']
    });
    if (!foundAnswer) {
      throw new NotFoundException();
    }
    try {
      const mappedModel = AnswerMapper.mapUpdateAnswerToModel(dto, foundAnswer);
      const savedModel = await this.answerModelRepository.save(mappedModel);
      return AnswerMapper.mapToDto(savedModel);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    const deleteResult = await this.answerModelRepository.delete({id})
    if (deleteResult.affected === 0) {
      throw new BadRequestException();
    }
  }
}
