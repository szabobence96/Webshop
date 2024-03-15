import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ProductService } from '../../product-modal-helper/product-service';

@Component({
  selector: 'app-jpg-fragrances',
  templateUrl: './jpg-fragrances.component.html',
  styleUrls: ['../../style-helper/product-style-helper.scss']

})
export class JPGFragrancesComponent {
  constructor(
    public services: SharedService,
    public productService: ProductService
  ) { }
}
