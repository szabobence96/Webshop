import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false]
  });

  constructor(
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router,
    private fb: NonNullableFormBuilder,
  ) { }

  emailInvalid = false;
  passwordInvalid = false;
  hide = false;

  ngOnInit(): void {
    const savedCredentials = this.authService.getSavedCredentials();
    if (savedCredentials) {
      this.loginForm.patchValue({
        email: savedCredentials.email,
        password: savedCredentials.password,
        rememberMe: true,
      });
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {

    const { email, password, rememberMe } = this.loginForm.value;
    this.emailInvalid = this.loginForm.get('email')!.invalid;
    this.passwordInvalid = this.loginForm.get('password')!.invalid;

    if (!this.loginForm.valid || !email || !password) {
      return;
    }

    this.authService
      .login(email, password)
      .pipe(
        this.toast.observe({
          success: 'Sikeres bejelentkezés',
          loading: 'Bejelentkezés...',
          error: `Hibás E-mail vagy jelszó!`,
        })
      )
      .subscribe(
        () => {
          if (rememberMe) {
            this.authService.saveCredentials(email, password);
          } else {
            this.authService.clearSavedCredentials();
          }
          this.router.navigate(['/user/profile']);
          //window.location.reload();
        });
  }
}
