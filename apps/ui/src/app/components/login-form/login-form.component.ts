import {Component, EventEmitter, Output} from '@angular/core';
import {Authenticate} from "../../data-models/authenticate";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'course-project-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() submit = new EventEmitter<Authenticate>();

  ngDoCheck() {
    console.log('login form check!');
  }

  // reactive form
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  login() {
    this.submit.emit({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    } as Authenticate);
  }
}
