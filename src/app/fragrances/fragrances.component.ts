import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-fragrances',
  templateUrl: './fragrances.component.html',
  styleUrls: ['./fragrances.component.scss']
})
export class FragrancesComponent {
  isModalOpen = false;
  selectedProduct = [];


  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  constructor(public services: SharedService) {
  }

  JPG: any[] = [];

  ngOnInit() {
    this.services.refreshData(() => this.services.getJPG(), this.JPG);
  }
}
