import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ModalService } from 'src/app/product-modal-helper/modal-service.service';
import { ProductService } from 'src/app/product-modal-helper/product-service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-modal',
  templateUrl: './shopping-cart-modal.component.html',
  styleUrls: ['./shopping-cart-modal.component.scss']
})
export class ShoppingCartModalComponent implements OnInit {
  constructor(
    public productService: ProductService,
    public modalService: ModalService,
    public services: SharedService,
    public cartService: ShoppingCartService,) {
  }
  customKeepText: string = "Vissza"
  @Input() product: any;
  ngOnInit(): void {

  }
}
