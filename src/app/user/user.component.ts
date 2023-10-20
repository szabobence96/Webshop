import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;
  items: any = [];
  users: any = [];
  userEmail: string | undefined;
  userOrders: any = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private usersService: UsersService,
    private services: SharedService,
  ) { }

  ngOnInit(): void {

  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/user']);
    });
  }
}