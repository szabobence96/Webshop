import { ElementRef, HostListener, Injectable, Input, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { SharedService } from '../app/shared.service';
import { AngularFirestoreModule, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { Observable, map } from 'rxjs';
import { DocumentData, Firestore, addDoc, collection, collectionData, getDocs, query, where } from '@angular/fire/firestore';
import { ProductInterface } from '../app/products/products.interface';

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
  displayItemCount: number = 6;

  fragrances$ = collectionData(collection(this.firestore, 'fragrances')) as Observable<ProductInterface[]>;
  manFragrances$ = collectionData(query(collection(this.firestore, 'fragrances'), where('gender', '==', 'man')));
  womanFragrances$ = collectionData(query(collection(this.firestore, 'fragrances'), where('gender', '==', 'woman')));
  diorQuery$ = collectionData(query(collection(this.firestore, 'fragrances'), where('brand', '==', 'Dior')));
  lancomeQuery$ = collectionData(query(collection(this.firestore, 'fragrances'), where('brand', '==', 'Lancome')));
  JPGQuery$ = collectionData(query(collection(this.firestore, 'fragrances'), where('brand', '==', 'Jean Paul Gaultier')));

  loadMore() {
    this.displayItemCount += 6;
  }
  filterCheck() {
    this.isFilterChecked = !this.isFilterChecked;
  }
  selectedBrands: string[] = [];
  selectedGender: string = '';
  onCheckboxChange(checkboxName: string) {
    if (checkboxName === 'isAllChecked') {
      this.isAllChecked = true;
      this.isDiorChecked = false;
      this.isLancomeChecked = false;
      this.isJPGChecked = false;
      this.isWomanChecked = false;
    }

    if (checkboxName === 'isDiorChecked'
      || checkboxName === 'isLancomeChecked'
      || checkboxName === 'isJPGChecked'
      || checkboxName === 'isWomanChecked'
    ) {
      this.isAllChecked = !(this.isDiorChecked || this.isLancomeChecked || this.isJPGChecked || this.isWomanChecked);
    }
    if (this.isWomanChecked === true) {
      this.diorQuery$ = collectionData(query(collection(this.firestore, 'fragrances'), where('gender', '==', 'woman'), where('brand', '==', 'Dior')));
      this.lancomeQuery$ = collectionData(query(collection(this.firestore, 'fragrances'), where('gender', '==', 'woman'), where('brand', '==', 'Lancome')));
      this.JPGQuery$ = collectionData(query(collection(this.firestore, 'fragrances'), where('gender', '==', 'woman'), where('brand', '==', 'Jean Paul Gaultier')));
    } else {
      this.diorQuery$ = collectionData(query(collection(this.firestore, 'fragrances'), where('brand', '==', 'Dior')));
      this.lancomeQuery$ = collectionData(query(collection(this.firestore, 'fragrances'), where('brand', '==', 'Lancome')));
      this.JPGQuery$ = collectionData(query(collection(this.firestore, 'fragrances'), where('brand', '==', 'Jean Paul Gaultier')));
    }
    if (this.isWomanChecked === true && (this.isDiorChecked === true || this.isLancomeChecked === true || this.isJPGChecked === true)) {
      this.womanFragrances$ = collectionData(query(collection(this.firestore, 'fragrances'), where('gender', '==', '*')));
    } else {
      this.womanFragrances$ = collectionData(query(collection(this.firestore, 'fragrances'), where('gender', '==', 'woman')));
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
    console.log('Kiválasztott termék:', product);
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    if (product.type && product.type.length > 0) {
      this.services.selectSize(product.type[0]);
    }
  }

  closeModal() {
    this.renderer.removeStyle(document.body, 'overflow');
    this.isModalOpen = false;
  }
}
