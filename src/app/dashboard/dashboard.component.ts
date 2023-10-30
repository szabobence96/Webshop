import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  images = [
    {
      imageSrc: './assets/images/commercial/scandal_commercial_ps_copy.jpg',
      imageAlt: 'scandal'
    },
    {
      imageSrc: './assets/images/commercial/sauvage_commercial.jpg',
      imageAlt: 'sauvage'
    },
  ]
}
