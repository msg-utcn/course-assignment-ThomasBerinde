import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AuthenticationModule, authRoutes} from "./authentication.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [AppComponent], // here we declare components
  imports: [
    BrowserModule,
    AuthenticationModule,
    RouterModule.forRoot([
      { path: 'auth', children: authRoutes }
    ]
  )], // here we declare modules
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
