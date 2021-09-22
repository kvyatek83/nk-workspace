import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  AngularAuthenticationModule,
  AUTHENTICATION_OPTIONS,
  ErrorInterceptor,
  JwtInterceptor,
} from '@nk-workspace/angular/authentication';
import { AngularMaterialModule } from '@nk-workspace/angular/material';
import { AppConfig } from './app-config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularMaterialModule,
    AngularAuthenticationModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (appConfig: AppConfig) => async () => {
        await appConfig.loadConfig();
      },
      deps: [AppConfig],
      multi: true,
    },
    {
      provide: AUTHENTICATION_OPTIONS,
      useFactory: (appConfig: AppConfig) => appConfig.config?.auth,
      deps: [AppConfig],
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
