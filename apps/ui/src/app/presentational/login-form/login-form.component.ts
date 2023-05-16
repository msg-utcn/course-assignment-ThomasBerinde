import {Component, EventEmitter, Output} from '@angular/core';
import {AuthenticateModel} from "../../data-models/authenticate.model";

@Component({
  selector: 'course-project-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() submit = new EventEmitter();

  login(authenticate: AuthenticateModel): void {
    this.submit.emit(authenticate);
  }
}
