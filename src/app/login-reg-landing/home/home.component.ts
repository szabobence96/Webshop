import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  user$ = this.authService.currentUser$;


  constructor(
    private authService: AuthenticationService,
    private fs: Firestore,
  ) { }

  ngOnInit(): void {

  }


}
