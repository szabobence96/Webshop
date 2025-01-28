import { Component } from '@angular/core';
import { ProductService } from 'src/app/product-modal-helper/product-service';

@Component({
  selector: 'app-custom-exit-button',
  templateUrl: './custom-exit-button.component.html',
  styleUrls: ['./custom-exit-button.component.scss']
})
export class CustomExitButtonComponent {

  constructor(
    public productService: ProductService
  ) { }
}
