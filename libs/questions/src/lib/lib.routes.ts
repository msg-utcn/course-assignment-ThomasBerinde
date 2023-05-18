import { Route } from '@angular/router';
import {QuestionsComponent} from "./containers/questions/questions.component";

export const questionsRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {path: '', component: QuestionsComponent} // we are already in the module (/questions) so we don't add anything to the path
];
