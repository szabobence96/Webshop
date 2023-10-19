import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private fs: Firestore) { }

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

  getHawkersWarwick() {
    return this.getCollectionData('hawkersWarwick');
  }

  getHawkersCS() {
    return this.getCollectionData('hawkersCS');
  }

  getHawkersCD() {
    return this.getCollectionData('hawkersCD');
  }

  getHawkersDL() {
    return this.getCollectionData('hawkersDL');
  }

  getHawkersOneRaw() {
    return this.getCollectionData('hawkersOneRaw');
  }

  getNikeAzur() {
    return this.getCollectionData('nikeAzur');
  }

  getNikeBlack() {
    return this.getCollectionData('nikeBlack');
  }

  getOrders() {
    return this.getCollectionData('*orders');
  }

  getUsers() {
    return this.getCollectionData('*users');
  }

  private cartItems: any[] = [];
  addToCart(item: any) {

    const existingItem = this.cartItems.find(cartItem => cartItem.product.id === item.id && cartItem.selectedSize === item.selectedSize);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product: item, quantity: 1 });
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  exit() {
    window.location.reload();
  }

}
