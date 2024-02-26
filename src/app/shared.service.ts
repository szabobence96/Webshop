import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { navbarData } from './sidenav/nav-data';
import { ModalService } from 'src/product-modal-helper/modal-service.service';

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
    console.log('Cart items before modification:', this.cartItems);
    console.log('cartItem.product.productName: ', this.cartItems.find(cartItem =>
      cartItem.product.productName))
    console.log('newItem.selectedPrice: ', newItem.selectedPrice)
    console.log('newItem.selectedColor: ', newItem.selectedColor)
    console.log('item.productName: ', item.productName)
    console.log('this.cartitems: ', this.cartItems)

    console.log('cartItem.product.productName értéke: ', this.cartItems)

    if (existingItem) {
      if (existingItem.quantity < 5) {
        existingItem.quantity++;
      }
    } else {
      this.cartItems.push({
        product: item, quantity: 1, selectedPrice: this.selectedSizePrice, size: this.selectedSize || null,
        color: this.selectedColor || null, selectedImage: this.currentImage || null
      });
      console.log('this.selectedSizePrice: ', this.selectedSizePrice);
      console.log('this.selectedSize : ', this.selectedSize);
      console.log('selectedImage , currentImage : ', this.currentImage);
    }

    const kosarElem = navbarData.find(item => item.routerLink === 'shopping-cart');
    if (kosarElem) {
      const cartItemCount = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      kosarElem.badge = cartItemCount;
    }

    console.log('Cart items after modification:', this.cartItems);
  }

  selectItem(item: any): void {
    this.selectedSize = item.size || null;
    this.selectedSizePrice = item.price || null;
    console.log('kiválasztott kiszerelés: item.size ', item.size)
    console.log('kiválasztott ár: item.price ', item.price)
  }

  selectColor(item: any): void {
    this.selectedColor = item.color || null;
    this.currentImage = item.selectedImage || null;
    this.shippingImage = item.selectedImage || null;
    if (this.currentImage === undefined) {
      this.currentImage === item.imagePath;
    }
    console.log('item.selectedimage', item.selectedImage)
    console.log('shipping image: ', this.shippingImage)
  }


  changeMainImage(imagePath: string): void {
    this.shippingImage = imagePath;
    console.log(' this shippingimage = imagePath value: ', this.shippingImage)
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
    console.log('valami', this.selectedSizePrice);
    return this.selectedSizePrice;
  }
  exit() {
    window.location.reload();
  }

}
