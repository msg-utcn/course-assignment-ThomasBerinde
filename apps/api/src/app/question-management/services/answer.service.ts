import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AnswerModel} from "../model/answer.model";
import {AnswerDto} from "../dtos/answer.dto";
import {AnswerMapper} from "../mappers/answer.mapper";
import {UpdateAnswerDto} from "../dtos/update-answer.dto";
import {CreateAnswerDto} from "../dtos/create-answer.dto";

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(AnswerModel)
    private answerModelRepository: Repository<AnswerModel>
  ) {
  }

  async readById(id: string): Promise<AnswerDto> {
    let foundModel = null;
    try {
      foundModel = await this.answerModelRepository.findOneBy({id});
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    if (!foundModel) {
      throw new NotFoundException();
    }
    return AnswerMapper.mapToDto(foundModel);
  }

  async readAll(): Promise<AnswerDto[]> {
    console.log("Entered")
    const foundModels = await this.answerModelRepository.find();
    if (!foundModels) {
      return []
    }
    return foundModels.map((model) => AnswerMapper.mapToDto(model))
  }

  async create(dto: CreateAnswerDto): Promise<AnswerDto> {
    try {
      const mappedModel = AnswerMapper.mapCreateAnswerToModel(dto);
      const savedModel = await this.answerModelRepository.save(mappedModel);
      return AnswerMapper.mapToDto(savedModel);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, dto: UpdateAnswerDto): Promise<AnswerDto> {
    const model = await this.answerModelRepository.findOne({where: {id}});
    if (!model) {
      throw new NotFoundException();
    }
    try {
      const mappedModel = AnswerMapper.mapUpdateAnswerToModel(dto, model);
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
