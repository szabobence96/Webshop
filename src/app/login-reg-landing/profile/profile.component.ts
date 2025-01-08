import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup, NonNullableFormBuilder, UntypedFormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { concatMap, switchMap, tap } from 'rxjs';
import { ProfileUser } from 'src/app/models/user-profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CallingCodeService } from 'src/app/services/calling-code.service';
import { UsersService } from 'src/app/services/users.service';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private toast: HotToastService,
    private usersService: UsersService,
    private fb: NonNullableFormBuilder,
    public callingCodeService: CallingCodeService,

  ) { }

  user$ = this.usersService.currentUserProfile$;
  contentLoaded: boolean = false;
  profileForm = this.fb.group({
    uid: [''],
    displayName: [''],
    firstName: [''],
    lastName: [''],
    callingCode: [''],
    phone: [''],
    address: [''],
  });
  callingCodes: string[] = [];


  ngOnInit(): void {
    this.callingCodes = this.callingCodeService.getCallingCodes();
    this.usersService.currentUserProfile$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });
    setTimeout(() => {
      this.contentLoaded = true;
    }, 1000);
  }

  saveProfile() {
    const { uid, ...data } = this.profileForm.value;

    if (!uid) {
      return;
    }

    this.usersService
      .updateUser({ uid, ...data })
      .pipe(
        this.toast.observe({
          loading: 'Profil mentése...',
          success: 'Sikeres mentés!',
          error: 'Hiba történt a profil mentése során!',
        })
      )
      .subscribe();
  }
  limitDigits(event: any) {
    const input = event.target.value;
    if (input.length > 12) {
      event.target.value = input.slice(0, 12);
    }
  }
}