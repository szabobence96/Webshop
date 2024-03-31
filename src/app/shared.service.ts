import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { navbarData } from './sidenav/nav-data';
import { ModalService } from 'src/app/product-modal-helper/modal-service.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private fs: Firestore,
  ) { }
  private cartItems: any[] = [];
  private currentProduct: any[] = [];
  public selectedSizePrice: any;
  public discount10: boolean = false;
  public discount20: boolean = false;
  public selectedSize: any;
  public selectedColor: any;
  public currentImage: any;
  public shippingImage: any;
  placedOrder: boolean = false;

  getCollectionData(collectionName: string) {
    let collectionRef = collection(this.fs, collectionName);
    return collectionData(collectionRef, { idField: 'id' });
  }


  refreshData(dataGetter: () => Observable<any[]>, targetArray: any[]) {
    dataGetter().subscribe((res) => {
      for (const item of res) {
        if (!targetArray.some(existingItem => existingItem.id === item.id)) {
          targetArray.push(item);
        }
      }
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
    const newItem = {
      selectedPrice: this.selectedSizePrice,
      selectedColor: this.selectedColor,
      selectedSize: this.selectedSize,
    };

    const existingItem = this.cartItems.find(cartItem =>
      cartItem.product.productName === item.productName &&
      cartItem.selectedPrice === newItem.selectedPrice &&
      cartItem.color === newItem.selectedColor &&
      cartItem.size === newItem.selectedSize
    );
    this.cartItems = this.getCartItems();
    if (existingItem) {
      if (existingItem.quantity < 5) {
        existingItem.quantity++;
      }
    }
    else {
      this.cartItems.push({
        product: item, quantity: 1, selectedPrice: this.selectedSizePrice, size: this.selectedSize || null,
        color: this.selectedColor || null, selectedImage: this.currentImage || null
      });
    }

    const kosarElem = navbarData.find(item => item.routerLink === 'shopping-cart');
    if (kosarElem) {
      const cartItemCount = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      kosarElem.badge = cartItemCount;
    }
  }

  selectItem(item: any): void {
    this.selectedSize = item.size || null;
    this.selectedSizePrice = item.price || null;
    this.discount10 = item.discount10 || null;
    this.discount20 = item.discount20 || null;
    if (item.discount10) {
      this.selectedSizePrice = this.selectedSizePrice * 0.9
    }
    if (item.discount20) {
      this.selectedSizePrice = this.selectedSizePrice * 0.8
    }
  }

  selectColor(item: any): void {
    this.selectedColor = item.color || null;
    this.currentImage = item.selectedImage || null;
    this.shippingImage = item.selectedImage || null;
    if (this.currentImage === undefined) {
      this.currentImage === item.imagePath;
    }
  }


  changeMainImage(imagePath: string): void {
    this.shippingImage = imagePath;
  }

  getCurrentProduct(item: any) {
    this.currentProduct.push([item]);
    return this.currentProduct;
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    const kosarElem = navbarData.find(item => item.routerLink === 'shopping-cart');
    if (kosarElem) {
      kosarElem.badge = 0;
    }
  }

  getSelectedPrice() {
    return this.selectedSizePrice;
  }

  exit() {
    window.location.reload();
  }

}
