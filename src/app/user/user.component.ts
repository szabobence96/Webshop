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
    this.services.refreshData(() => this.services.getOrders(), this.items);
    this.services.refreshData(() => this.services.getUsers(), this.users);
    this.getUser();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/user']);
    });
  }

  findMatchingEmails(items = this.items, users = this.users): any[] {
    const matchingEmails = [];
    for (const order of items) {
      for (const user of users) {
        if (order.email === user.email) {
          matchingEmails.push(order.email);
        }
      }
    }
    return matchingEmails;
  }

  getUser() {
    this.usersService.currentUserProfile$.subscribe((users: any) => {
      if (users && users.email) {
        this.userEmail = users.email;
        this.userOrders = this.findUserOrders(users.email);
      }
    });
  }

  findUserOrders(userEmail: string): any[] {
    return this.items.filter((order: { email: string; }) => order.email === userEmail);
  }
}
