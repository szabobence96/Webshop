import { Component } from '@angular/core';
import { FragranceServiceService } from '../fragrance-service.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-lancome-fragrances',
  templateUrl: './lancome-fragrances.component.html',
  styleUrls: ['../fragrances.component.scss']
})
export class LancomeFragrancesComponent {
  constructor(
    public services: SharedService,
    public fragranceService: FragranceServiceService
  ) { }
}
