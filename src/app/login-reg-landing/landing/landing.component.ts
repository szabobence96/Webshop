import { Component, OnInit } from '@angular/core';
import { canActivate } from '@angular/fire/auth-guard';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router, public service: SharedService) { }

  ngOnInit(): void {
    if (!this.service.placedOrder) {
      this.router.navigate(['/dashboard'])
    }
    setTimeout(() => {
      this.router.navigate(['/dashboard'])
      this.service.placedOrder = false;
    }, 4000)
  }
}
