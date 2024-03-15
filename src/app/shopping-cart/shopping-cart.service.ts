import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';
import { navbarData } from '../sidenav/nav-data';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

  navbarData = navbarData;
  insuranceIsChecked = true;
  giftIsChecked = false;
  shippingPrice = 1390;

  constructor(public services: SharedService) { }

  getTotalPrice() {
    let totalPrice = 0;
    for (const cartItem of this.services.getCartItems()) {
      totalPrice += (cartItem.selectedPrice * cartItem.quantity);
    }
    return totalPrice;
  }

  calculateShippingPrice() {
    const totalPrice = this.getTotalPrice();

    if (totalPrice >= 50000) {
      return this.shippingPrice = 0;
    } else {
      return this.shippingPrice = 1390;
    }
  }

  calculateInsurance() {
    const insuranceFee = this.insuranceIsChecked ? 500 : 0;
    return insuranceFee;
  }

  calculateGiftFee() {
    const giftFee = this.giftIsChecked ? 1590 : 0;
    return giftFee;
  }

  calculateTotalPayment(): number {
    const totalPrice = this.calculateShippingPrice() + this.getTotalPrice();
    const insuranceFee = this.calculateInsurance();
    const giftFee = this.calculateGiftFee();
    return totalPrice + insuranceFee + giftFee;
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
}