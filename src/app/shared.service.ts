import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { navbarData } from './sidenav/nav-data';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private fs: Firestore) { }
  private cartItems: any[] = [];
  private currentProduct: any[] = [];
  public selectedSizePrice: any;
  public selectedSize: any;

  getCollectionData(collectionName: string) {
    let collectionRef = collection(this.fs, collectionName);
    return collectionData(collectionRef, { idField: 'id' });
  }

  refreshData(dataGetter: () => Observable<any[]>, targetArray: any[]) {
    dataGetter().subscribe((res) => {
      targetArray.push(...res);
    });
  }

  getHawkers() {
    return this.getCollectionData('hawkers');
  }

  getJPG() {
    return this.getCollectionData('JPG')
  }

  getOrders() {
    return this.getCollectionData('*orders');
  }

  getUsers() {
    return this.getCollectionData('*users');
  }

  addToCartService(item: any) {
    const newItem = { selectedPrice: this.selectedSizePrice };
    const existingItem = this.cartItems.find(cartItem => cartItem.product.id === item.id && cartItem.selectedPrice === newItem.selectedPrice);
    this.cartItems = this.getCartItems();
    console.log('Cart items before modification:', this.cartItems);
    console.log('item: ', item)

    if (existingItem) {
      if (existingItem.quantity < 5) {
        existingItem.quantity++;
      }
    } else {
      this.cartItems.push({ product: item, quantity: 1, selectedPrice: this.selectedSizePrice, size: this.selectedSize });
      console.log('Selected size price: ', this.selectedSizePrice);
      console.log('Selected size : ', this.selectedSize);
    }

    const kosarElem = navbarData.find(item => item.routerLink === 'shopping-cart');
    if (kosarElem) {
      const cartItemCount = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      kosarElem.badge = cartItemCount;
    }

    console.log('Cart items after modification:', this.cartItems);
  }

  selectSize(item: any): void {
    this.selectedSize = item.size;
    this.selectedSizePrice = item.price;
    console.log('kiválasztott ár: ', item.price)
    console.log('kiválasztott kiszerelés: ', item.size)
  }

  getCurrentProduct(item: any) {
    this.currentProduct.push([item]);
    return this.currentProduct;
  }

  getCartItems() {
    return this.cartItems;
  }

  getSelectedPrice() {
    console.log('valami', this.selectedSizePrice);
    return this.selectedSizePrice;
  }
  exit() {
    window.location.reload();
  }

}
