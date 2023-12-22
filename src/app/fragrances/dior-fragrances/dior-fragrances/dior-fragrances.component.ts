import { Component } from '@angular/core';
import { FragranceServiceService } from '../../fragrance-service.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-dior-fragrances',
  templateUrl: '../dior-fragrances/dior-fragrances.component.html',
  styleUrls: ['../../fragrances.component.scss']
})

export class DiorFragrancesComponent {
  constructor(
    public services: SharedService,
    public fragranceService: FragranceServiceService
  ) { }


}
