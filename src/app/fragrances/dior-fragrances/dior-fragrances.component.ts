import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product-modal-helper/product-service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-dior-fragrances',
  templateUrl: './dior-fragrances.component.html',
  styleUrls: ['../../style-helper/product-style-helper.scss']
})

export class DiorFragrancesComponent {
  constructor(
    public services: SharedService,
    public productService: ProductService
  ) { }



}
