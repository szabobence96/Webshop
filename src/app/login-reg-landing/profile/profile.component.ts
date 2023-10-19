import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup, NonNullableFormBuilder, UntypedFormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { concatMap, switchMap, tap } from 'rxjs';
import { ProfileUser } from 'src/app/models/user-profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
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
    private imageUploadService: ImageUploadService,
    private toast: HotToastService,
    private usersService: UsersService,
    private fb: NonNullableFormBuilder
  ) { }

  user$ = this.usersService.currentUserProfile$;

  profileForm = this.fb.group({
    uid: [''],
    displayName: [''],
    firstName: [''],
    lastName: [''],
    phone: [''],
    address: [''],
  });


  ngOnInit(): void {
    this.usersService.currentUserProfile$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });
  }

  uploadImage(event: any, user: ProfileUser) {
    this.imageUploadService.uploadImage(event.target.files[0], `images/profile/${user.uid}`)
      .pipe(
        this.toast.observe(
          {
            loading: 'A kép töltődik...',
            success: 'A kép sikeresen feltöltve!',
            error: 'Hiba a kép feltöltése közben'
          }
        ),
        switchMap((photoURL) => this.usersService.updateUser({ uid: user.uid, photoURL }))
      ).subscribe();
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
}