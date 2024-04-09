import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CallingCodeService } from 'src/app/services/calling-code.service';
import { UsersService } from 'src/app/services/users.service';


export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../login/login.component.scss', './sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  signUpForm = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      callingCode: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatchValidator() }
  );

  constructor(
    public callingCodeService: CallingCodeService,
    private authService: AuthenticationService,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private toast: HotToastService,
    private usersService: UsersService,
  ) { }

  hide = true;
  termsChecked = false;
  callingCodes: string[] = [];

  termsCheck(event: MouseEvent) {
    if (event.target !== event.currentTarget) {
      event.stopPropagation();
      this.termsChecked = !this.termsChecked;
    }
  }
  ngOnInit(): void {
    this.callingCodes = this.callingCodeService.getCallingCodes();
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get address() {
    return this.signUpForm.get('address');
  }

  get firstName() {
    return this.signUpForm.get('firstName');
  }

  get lastName() {
    return this.signUpForm.get('lastName');
  }
  get callingCode() {
    return this.signUpForm.get('callingCode');
  }
  get phone() {
    return this.signUpForm.get('phone');
  }

  submit() {
    const { lastName, firstName, address, callingCode, phone, email, password } = this.signUpForm.value;

    if (!this.signUpForm.valid || !firstName || !firstName || !password || !email || !address || !callingCode || !phone || this.termsChecked == false) {
      return;
    }

    this.authService.signUp(email, password).pipe(
      switchMap(({ user: { uid } }) => this.usersService.addUser({ uid, email, lastName, firstName, address, callingCode, phone, displayName: lastName })),
      this.toast.observe({
        success: 'Sikeres regisztráció!',
        loading: 'Bejelentkezés',
        error: ({ message }) => `${message}`,
      })
    ).subscribe(() => {
      this.router.navigate(['/user']);
    })
  }
  limitDigits(event: any) {
    const input = event.target.value;
    if (input.length > 12) {
      event.target.value = input.slice(0, 12);
    }
  }
}