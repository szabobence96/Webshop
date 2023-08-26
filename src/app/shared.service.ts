import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private fs: Firestore) { }

  getCollectionData(collectionName: string) {
    let collectionRef = collection(this.fs, collectionName);
    return collectionData(collectionRef, { idField: 'id' });
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
  private cartItems: any[] = [];

    addToCart(item: any) {
      const existingItem = this.cartItems.find(cartItem => cartItem.product.id === item.id);
      if (existingItem) {
          existingItem.quantity++;
      } else {
          this.cartItems.push({ product: item, quantity: 1 });
      }
    }

    getCartItems() {
        return this.cartItems;
    }
}
