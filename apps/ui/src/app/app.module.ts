import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthModule, authRoutes } from './auth.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './containers/register/register.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

@NgModule({
  declarations: [AppComponent, RegisterComponent, RegisterFormComponent], // here we declare components
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'auth', children: authRoutes },
      { path: 'questions', loadChildren: () =>
          import("@course-project/questions").then(module => module.QuestionsModule)
        //import("libs/questions/src/lib/questions.module").then(module => module.QuestionsModule)
      }
    ]),
    AuthModule,
  ], // here we declare modules
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
