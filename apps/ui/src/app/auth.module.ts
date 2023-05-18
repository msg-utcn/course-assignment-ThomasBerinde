import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {LoginComponent} from "./containers/login/login.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./material.modules";

export const authRoutes: Route[] = [
  { path: 'login', component: LoginComponent } // here we use the container, not the components module
]

// tell Angular that this is a module
@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule, MaterialModule, ReactiveFormsModule],
  declarations: [LoginComponent, LoginFormComponent],
  providers: []
})
export class AuthModule {

}
