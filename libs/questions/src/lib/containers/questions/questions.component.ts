import { Component } from '@angular/core';
import {QuestionsService} from "../../services/questions.service";

@Component({
  selector: 'course-project-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent {

  constructor(private questionsService: QuestionsService) {
  }

  getAllQuestions(): void {
    this.questionsService.getAllQuestions().subscribe(questions => {
      console.log(questions);
    });
  }
}
