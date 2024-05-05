import { ElementRef, HostListener, Injectable, Input, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { SharedService } from '../shared.service';
import { AngularFirestoreModule, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { Observable, map, take } from 'rxjs';
import { DocumentData, Firestore, addDoc, collection, collectionData, getDocs, query, where } from '@angular/fire/firestore';
import { ProductInterface } from '../products/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private renderer: Renderer2;
  constructor(private rendererFactory: RendererFactory2,
    public services: SharedService,
    public firestore: Firestore,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  isAllChecked: boolean = true;
  isDiorChecked: boolean = false;
  isLancomeChecked: boolean = false;
  isJPGChecked: boolean = false;
  isWomanChecked: boolean = false;
  isManChecked: boolean = false;
  isModalOpen = false;
  selectedProduct: any;
  isFilterChecked: boolean = false;

  fragrances$ = collectionData(collection(this.firestore, 'fragrances')) as Observable<ProductInterface[]>;
  manFragrances$ = collectionData(query(collection(this.firestore, 'fragrances'), where('gender', '==', 'man')));
  womanFragrances$ = collectionData(query(collection(this.firestore, 'fragrances'), where('gender', '==', 'woman')));
  diorQuery$ = collectionData(query(collection(this.firestore, 'fragrances'), where('brand', '==', 'Dior')));
  lancomeQuery$ = collectionData(query(collection(this.firestore, 'fragrances'), where('brand', '==', 'Lancome')));
  JPGQuery$ = collectionData(query(collection(this.firestore, 'fragrances'), where('brand', '==', 'Jean Paul Gaultier')));


  filterCheck() {
    this.isFilterChecked = !this.isFilterChecked;
  }

  onCheckboxChange(checkboxName: string) {
    if (checkboxName === 'isAllChecked') {
      this.isAllChecked = true;
      this.isDiorChecked = false;
      this.isLancomeChecked = false;
      this.isJPGChecked = false;
      this.isWomanChecked = false;
      this.isManChecked = false;
    }
    if (checkboxName === 'isDiorChecked'
      || checkboxName === 'isLancomeChecked'
      || checkboxName === 'isJPGChecked'
      || checkboxName === 'isWomanChecked'
      || checkboxName === 'isManChecked'
    ) {
      this.isAllChecked = !(this.isDiorChecked || this.isLancomeChecked || this.isJPGChecked || this.isWomanChecked || this.isManChecked);
    }

    const baseQuery = collection(this.firestore, 'fragrances');

    if (this.isManChecked === true) {
      this.diorQuery$ = collectionData(query(baseQuery, where('gender', '==', 'man'), where('brand', '==', 'Dior')));
      this.lancomeQuery$ = collectionData(query(baseQuery, where('gender', '==', 'man'), where('brand', '==', 'Lancome')));
      this.JPGQuery$ = collectionData(query(baseQuery, where('gender', '==', 'man'), where('brand', '==', 'Jean Paul Gaultier')));

      if (this.isManChecked === true && (this.isDiorChecked || this.isLancomeChecked || this.isJPGChecked)) {
        this.manFragrances$ = collectionData(query(baseQuery, where('gender', '==', 'man'), where('brand', '==', '*')));
      } else {
        this.manFragrances$ = collectionData(query(baseQuery, where('gender', '==', 'man')));
      }
    }

    if (this.isWomanChecked === true) {
      this.diorQuery$ = collectionData(query(baseQuery, where('gender', '==', 'woman'), where('brand', '==', 'Dior')));
      this.lancomeQuery$ = collectionData(query(baseQuery, where('gender', '==', 'woman'), where('brand', '==', 'Lancome')));
      this.JPGQuery$ = collectionData(query(baseQuery, where('gender', '==', 'woman'), where('brand', '==', 'Jean Paul Gaultier')));

      if (this.isWomanChecked === true && (this.isDiorChecked || this.isLancomeChecked || this.isJPGChecked)) {
        this.womanFragrances$ = collectionData(query(baseQuery, where('gender', '==', 'woman'), where('brand', '==', '*')));
      } else {
        this.womanFragrances$ = collectionData(query(baseQuery, where('gender', '==', 'woman')));
      }
    }

    if (this.isWomanChecked === false && this.isManChecked === false) {
      this.diorQuery$ = collectionData(query(baseQuery, where('brand', '==', 'Dior')));
      this.lancomeQuery$ = collectionData(query(baseQuery, where('brand', '==', 'Lancome')));
      this.JPGQuery$ = collectionData(query(baseQuery, where('brand', '==', 'Jean Paul Gaultier')));
    }
  }

  mouseOver(product: ProductInterface | DocumentData) {
    product.imagePath = product.modalImagePath[1];
  }

  mouseLeave(product: ProductInterface | DocumentData) {
    product.imagePath = product.modalImagePath[0]
  }
  openModal(product: ProductInterface | DocumentData) {
    this.selectedProduct = product;
    this.isModalOpen = true;

    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    if (product.type && product.type.length > 0) {
      this.services.selectItem(product.type[0]);
    }
    if (product.colorType && product.colorType.length > 0) {
      this.services.selectColor(product.colorType[0]);
    }

  }

  closeModal() {
    this.renderer.removeStyle(document.body, 'overflow');
    this.isModalOpen = false;
  }

  closeAddedModal() {
    this.renderer.removeStyle(document.body, 'overflow');
    this.services.addedToCart = false;
    this.services.shippingImage = "";
    console.log('this.services.addedToCart: ', this.services.addedToCart)
  }
}
