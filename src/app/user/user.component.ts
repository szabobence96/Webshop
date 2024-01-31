import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { SharedService } from '../shared.service';
import { Observable, Subscription, map, startWith } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user$ = this.usersService.currentUserProfile$;
  constructor(

    public authService: AuthenticationService,
    private router: Router,
    private usersService: UsersService,
    private services: SharedService,
  ) { }

  ngOnInit(): void { }

}
