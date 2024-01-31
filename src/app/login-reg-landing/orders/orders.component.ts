import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {

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
}
