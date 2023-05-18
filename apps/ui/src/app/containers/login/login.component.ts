import {ChangeDetectionStrategy, Component, DoCheck} from '@angular/core';
import {Authenticate} from "../../data-models/authenticate";
import {AuthService} from "../../services/auth.service.";

@Component({
  selector: 'course-project-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements DoCheck {

  constructor(private authService: AuthService) {
  }

  public login(authenticate: Authenticate): void {
    this.authService.login(authenticate).subscribe();
  }
  ngDoCheck() {
    console.log('login check!');
  }
}
