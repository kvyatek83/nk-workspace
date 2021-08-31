import { Component } from '@angular/core';
import { AuthenticationService } from '@nk-workspace/angular/authentication';

@Component({
  selector: 'nk-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sand-box';

  constructor(private authenticationService: AuthenticationService) {}
}
