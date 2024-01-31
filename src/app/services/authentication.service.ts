import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
} from '@angular/fire/auth';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: Auth) { }
  private readonly localStorageKey = 'savedCredentials';

  getSavedCredentials(): { email: string; password: string } | null {
    const savedCredentials = localStorage.getItem(this.localStorageKey);
    return savedCredentials ? JSON.parse(savedCredentials) : null;
  }

  saveCredentials(email: string, password: string): void {
    const credentials = { email, password };
    localStorage.setItem(this.localStorageKey, JSON.stringify(credentials));
  }

  clearSavedCredentials(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  currentUser$ = authState(this.auth);

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  logout(): Observable<any> {
    return from(this.auth.signOut())
  }

  signUp(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap(user => {
        if (!user) throw new Error('Nincs hitelesítve!');
        return updateProfile(user, profileData)
      })
    )
  }
}
