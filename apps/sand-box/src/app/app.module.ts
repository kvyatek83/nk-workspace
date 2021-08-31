import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppConfig } from './app-config';
import { AUTHENTICATION_OPTIONS } from '@nk-workspace/angular/authentication';
import { AngularMaterialModule } from '@nk-workspace/angular/material';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AngularMaterialModule],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (appConfig: AppConfig) => async () => {
      await appConfig.loadConfig();
    },
    deps: [AppConfig],
    multi: true
  },
  {
    provide: AUTHENTICATION_OPTIONS, useFactory: (appConfig: AppConfig) => appConfig.config?.auth, deps: [AppConfig]
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
