import { Component } from '@angular/core';
import { ProductService } from '../../product-modal-helper/product-service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-lancome-fragrances',
  templateUrl: './lancome-fragrances.component.html',
  styleUrls: ['../../style-helper/product-style-helper.scss']
})
export class LancomeFragrancesComponent {
  constructor(
    public services: SharedService,
    public productService: ProductService
  ) { }
}
