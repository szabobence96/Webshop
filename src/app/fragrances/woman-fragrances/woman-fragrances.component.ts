import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ProductService } from 'src/app/product-modal-helper/product-service';

@Component({
  selector: 'app-woman-fragrances',
  templateUrl: './woman-fragrances.component.html',
  styleUrls: ['../../style-helper/product-style-helper.scss']
})
export class WomanFragrancesComponent {
  constructor(
    public services: SharedService,
    public productService: ProductService
  ) { }
}
