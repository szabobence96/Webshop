import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-rewiev',
  templateUrl: './customer-rewiev.component.html',
  styleUrls: ['./customer-rewiev.component.scss']
})
export class CustomerRewievComponent implements OnInit {
  constructor() {

  }

  contentLoaded: boolean = false;
  ngOnInit(): void {
    setTimeout(() => {
      this.contentLoaded = true;
    }, 1000);
  }
}
