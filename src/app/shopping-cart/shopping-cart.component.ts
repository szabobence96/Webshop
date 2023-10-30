import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { navbarData } from '../sidenav/nav-data';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(public services: SharedService, public shoppingService: ShoppingCartService) { }

  cartItems: any[] = [];
  selectedProducts: any[] = [];

  navbarData = navbarData;
  insuranceIsChecked = true;
  giftIsChecked = false;
  shippingPrice = 1390;

  ngOnInit() {
    this.cartItems = this.services.getCartItems();
  }

  addToCart() {
    const kosarElem = this.navbarData.find(item => item.routerLink === 'shopping-cart');
    if (kosarElem) {
      kosarElem.badge = (kosarElem.badge || 0) + 1;
    }
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

  removeFromCart(cartItem: any) {
    const index = this.services.getCartItems().indexOf(cartItem);
    if (index !== -1) {
      const numRemoved = cartItem.quantity;
      this.services.getCartItems().splice(index, 1);

      const kosarElem = this.navbarData.find(item => item.routerLink === 'shopping-cart');
      if (kosarElem) {
        kosarElem.badge = Math.max((kosarElem.badge || 0) - numRemoved, 0);
      }
    }
  }

  calculateShippingPrice() {
    const totalPrice = this.getTotalPrice();

    if (totalPrice >= 50000) {
      return this.shippingPrice = 0; // Vonj le a szállítási díjból
    } else {
      return this.shippingPrice = 1390; // Alapértelmezett szállítási díj
    }
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (const cartItem of this.services.getCartItems()) {
      totalPrice += cartItem.product.price * cartItem.quantity;
    }
    return totalPrice;
  }

  calculateTotalPayment(): number {
    const totalPrice = this.calculateShippingPrice() + this.getTotalPrice();
    const insuranceFee = this.insuranceIsChecked ? 500 : 0;
    const giftFee = this.giftIsChecked ? 1590 : 0;

    return totalPrice + insuranceFee + giftFee;
  }
}