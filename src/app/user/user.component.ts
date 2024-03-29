import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  contentLoaded: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.contentLoaded = true;
    }, 500);
  }
}
