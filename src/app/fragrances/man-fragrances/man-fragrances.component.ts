import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ProductService } from 'src/app/product-modal-helper/product-service';

@Component({
  selector: 'app-man-fragrances',
  templateUrl: './man-fragrances.component.html',
  styleUrls: ['../../style-helper/product-style-helper.scss']
})
export class ManFragrancesComponent {
  constructor(
    public services: SharedService,
    public productService: ProductService
  ) { }
}
