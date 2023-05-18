import {CreateAnswerDto} from "../dtos/create-answer.dto";
import {AnswerModel} from "../model/answer.model";
import {AnswerDto} from "../dtos/answer.dto";
import {UpdateAnswerDto} from "../dtos/update-answer.dto";
import {QuestionModel} from "../model/question.model";

export class AnswerMapper {

  static mapToDto(model: AnswerModel): AnswerDto {
    return new AnswerDto({
      id: model.id,
      content: model.content,
      parentId: model.parent.id,
      rating: model.rating,
      creationDate: new Date(model.creationDate).toISOString(),
    })
  }

  static mapCreateAnswerToModel(dto: CreateAnswerDto, parent: QuestionModel): AnswerModel {
    return new AnswerModel({
      id: undefined,
      parent: parent,
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
      parent: oldModel.parent,
      rating: oldModel.rating,
      creationDate: oldModel.creationDate
    })
  }
}
