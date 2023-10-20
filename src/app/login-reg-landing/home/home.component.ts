import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  user$ = this.authService.currentUser$;
  items: any = [];
  users: any = [];
  userEmail: string | undefined;
  userOrders: any = [];

  constructor(
    private authService: AuthenticationService,
    private usersService: UsersService,
    private services: SharedService,
  ) { }

  ngOnInit(): void {
    this.services.refreshData(() => this.services.getOrders(), this.items);
    this.services.refreshData(() => this.services.getUsers(), this.users);
    this.getUser();
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

  /*
  indMatchingEmails(items = this.items, users = this.users): any[] {
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
  */
}
