import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { FragranceServiceService } from '../../fragrance-service.service';

@Component({
  selector: 'app-jpg-fragrances',
  templateUrl: './jpg-fragrances.component.html',
  styleUrls: ['../../fragrances.component.scss']

})
export class JPGFragrancesComponent {
  constructor(
    public services: SharedService,
    public fragranceService: FragranceServiceService
  ) { }
}
