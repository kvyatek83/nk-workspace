import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

// function matchingPassword(form: FormGroup): ValidationErrors | null {
//   const pass = form.get('password').value;
//   const confirmPass = form.get('confirmPass').value;
//   if (!pass || pass === confirmPass) {
//     return null;
//   }
//   return {notSame: true};
// }


// registerForm: FormGroup = this.formBuilder.group({
//   email: ['', [Validators.required, Validators.email]],
//   thePassword: this.formBuilder.group({
//     password: ['', Validators.required],
//     confirmPass: ['', Validators.required],
//   }, {validators: matchingPassword}),
//   confirmTerms: [false, Validators.requiredTrue],
// });

@Component({
  selector: 'nk-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  hidePassword = true;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get email(): AbstractControl {
    return this.loginForm.controls.email;
  }

  get password(): AbstractControl {
    return this.loginForm.controls.password;
  }

  constructor(private formBuilder: FormBuilder) {}

  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      console.log('aaaaaaa');
    }
  }
}
