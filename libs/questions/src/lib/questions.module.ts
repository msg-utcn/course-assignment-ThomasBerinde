import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { questionsRoutes } from './lib.routes';
import { QuestionsComponent } from './containers/questions/questions.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(questionsRoutes)],
  declarations: [QuestionsComponent],
})
export class QuestionsModule {}
