import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ConsoleComponent } from './console/console.component';
import { AngularAuthenticationModule } from '@nk-workspace/angular/authentication';
import { AngularMaterialModule } from '@nk-workspace/angular/material';


@NgModule({
  declarations: [
    ConsoleComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularAuthenticationModule,
    AngularMaterialModule
  ]
})
export class AdminModule { }
