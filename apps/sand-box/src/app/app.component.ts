import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  Role,
  UserProfile,
} from '@nk-workspace/angular/authentication';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'nk-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly ADMIN = Role.Admin;
  user$ = new BehaviorSubject<UserProfile>(null);

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser$.subscribe(this.user$);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
