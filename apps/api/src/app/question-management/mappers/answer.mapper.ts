import {CreateAnswerDto} from "../dtos/create-answer.dto";
import {AnswerModel} from "../model/answer.model";
import {AnswerDto} from "../dtos/answer.dto";
import {UpdateAnswerDto} from "../dtos/update-answer.dto";

export class AnswerMapper {

  static mapToDto(model: AnswerModel): AnswerDto {
    return new AnswerDto({
      id: model.id,
      content: model.content,
      rating: model.rating,
      creationDate: new Date(model.creationDate).toISOString(),
    })
  }

  static mapCreateAnswerToModel(dto: CreateAnswerDto): AnswerModel {
    return new AnswerModel({
      id: undefined,
      content: dto.content,
      rating: 0,
      creationDate: new Date()
    })
  }

  static mapUpdateAnswerToModel(
    dto: UpdateAnswerDto,
    oldModel: AnswerModel
  ): AnswerModel {
    return new AnswerModel({
      id: oldModel.id,
      content: dto.content,
      rating: oldModel.rating,
      creationDate: oldModel.creationDate
    })
  }
}
