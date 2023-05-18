import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {QuestionModel} from "../models/question.model";

@Injectable({
  providedIn: 'root'
  // makes this a dependency in the highest module (questions.module)
  // makes sure this is singleton if you use it in multiple parts
})
export class QuestionsService {

  constructor(private httpClient: HttpClient) {

  }

  public getAllQuestions(): Observable<QuestionModel> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken()
    })
    return this.httpClient.get("http://localhost:3000/api/question-management", { headers });
  }

  private getToken(): string {
    const token = localStorage.getItem("access_token");
    return token ? token : '';
  }
}
