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
      totalPrice += cartItem.product.price * cartItem.quantity;
    }
    return totalPrice;
  }

  calculateShippingPrice() {
    const totalPrice = this.getTotalPrice();

    if (totalPrice >= 50000) {
      return this.shippingPrice = 0; // Vonj le a szállítási díjból
    } else {
      return this.shippingPrice = 1390; // Alapértelmezett szállítási díj
    }
  }

  calculateInsurance(){
    const insuranceFee = this.insuranceIsChecked ? 500 : 0;
    return insuranceFee;
  }

  calculateGiftFee(){
    const giftFee = this.giftIsChecked ? 1590 : 0;
    return giftFee;
  }
  calculateTotalPayment(): number {
    const totalPrice = this.calculateShippingPrice() + this.getTotalPrice();
    const insuranceFee = this.calculateInsurance();
    const giftFee = this.calculateGiftFee();
    
    return totalPrice + insuranceFee + giftFee;
  }
  
}