import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';
import { SharedService } from 'src/app/shared.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';


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
  contentLoaded: boolean = false;
  constructor(
    private fs: Firestore,
    private authService: AuthenticationService,
    private usersService: UsersService,
    public services: SharedService,
  ) { }


  ngOnInit(): void {
    this.services.refreshData(() => this.services.getOrders(), this.items);
    this.services.refreshData(() => this.services.getUsers(), this.users);
    this.getUser();
    setTimeout(() => {
      this.contentLoaded = true;
    }, 1000);
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
