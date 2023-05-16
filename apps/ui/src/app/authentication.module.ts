import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {LoginComponent} from "./containers/login/login.component";
import {LoginFormComponent} from "./presentational/login-form/login-form.component";

export const authRoutes: Route[] = [
  { path: 'login', component: LoginComponent } // here we use the container, not the presentational module
]

// tell Angular that this is a module
@NgModule({
  imports: [RouterModule],
  declarations: [LoginComponent, LoginFormComponent]
})
export class AuthenticationModule {

}
