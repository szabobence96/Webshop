import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private fs: Firestore) { }
  private cartItems: any[] = [];
  private currentProduct: any[] = [];

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

  addToCart(item: any) {

    const existingItem = this.cartItems.find(cartItem => cartItem.product.id === item.id && cartItem.selectedSize === item.selectedSize);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product: item, quantity: 1 });
    }
  }

  getCurrentProduct(item: any) {
    this.currentProduct.push([item]);
    return this.currentProduct;
  }

  getCartItems() {
    return this.cartItems;
  }

  exit() {
    window.location.reload();
  }
}
