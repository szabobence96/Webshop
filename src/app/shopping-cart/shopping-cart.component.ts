import { Component, HostListener, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { navbarData } from '../sidenav/nav-data';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductService } from 'src/app/product-modal-helper/product-service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(public services: SharedService, public shoppingService: ShoppingCartService, public productService: ProductService) { }

  cartItems: any[] = [];
  selectedProducts: any[] = [];
  contentLoaded: boolean = false;
  navbarData = navbarData;
  insuranceIsChecked = true;
  giftIsChecked = false;
  shippingPrice = 1390;
  selectedProductPrice = this.services.selectedSizePrice;
  screenWidth: number = 0;

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.cartItems = this.services.getCartItems();
    setTimeout(() => {
      this.contentLoaded = true;
    }, 500);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }
  getProductPrice() {
    return this.selectedProductPrice;
  }

  increaseQuantity(cartItem: any) {
    cartItem.quantity++;
    const kosarElem = this.navbarData.find(item => item.routerLink === 'shopping-cart');
    if (kosarElem) {
      kosarElem.badge = (kosarElem.badge || 0) + 1;
    }
  }

  decreaseQuantity(cartItem: any) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      const kosarElem = this.navbarData.find(item => item.routerLink === 'shopping-cart');
      if (kosarElem) {
        kosarElem.badge = (kosarElem.badge || 0) - 1;
      }
    }
  }

  calculateShippingPrice() {
    const totalPrice = this.getTotalPrice();

    if (totalPrice >= 50000) {
      return this.shippingPrice = 0;
    } else {
      return this.shippingPrice = 1390;
    }
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (const cartItem of this.services.getCartItems()) {
      totalPrice += cartItem.selectedPrice * cartItem.quantity;
    }
    return totalPrice;
  }
}