import { Component } from '@angular/core';
import {AuthenticateModel} from "../../data-models/authenticate.model";

@Component({
  selector: 'course-project-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  login(authenticate: AuthenticateModel): void {
    console.log(authenticate);
  }
}
