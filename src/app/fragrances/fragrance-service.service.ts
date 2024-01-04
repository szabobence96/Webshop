import { ElementRef, HostListener, Injectable, Input, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { AngularFirestoreModule, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { Observable, map } from 'rxjs';
import { DocumentData, Firestore, addDoc, collection, collectionData, getDocs, query, where } from '@angular/fire/firestore';
import { ProductInterface } from '../products/products.interface';

@Injectable({
  providedIn: 'root'
})
export class FragranceServiceService {

  constructor(
    public services: SharedService,
    public firestore: Firestore,
  ) { }


  isAllChecked: boolean = true;
  isDiorChecked: boolean = false;
  isLancomeChecked: boolean = false;
  isJPGChecked: boolean = false;
  isModalOpen = false;
  selectedProduct: any;
  fragrances$ = collectionData(collection(this.firestore, 'fragrances')) as Observable<ProductInterface[]>;

  diorQuery$ = collectionData(query(collection(this.firestore, 'fragrances'), where('brand', '==', 'Dior')));
  lancomeQuery$ = collectionData(query(collection(this.firestore, 'fragrances'), where('brand', '==', 'Lancome')));
  JPGQuery$ = collectionData(query(collection(this.firestore, 'fragrances'), where('brand', '==', 'Jean Paul Gaultier')));


  onCheckboxChange(checkboxName: string) {
    if (checkboxName === 'isAllChecked') {
      this.isAllChecked = true;
      this.isDiorChecked = false;
      this.isLancomeChecked = false;
      this.isJPGChecked = false;
    }

    if (checkboxName === 'isDiorChecked' || checkboxName === 'isLancomeChecked' || checkboxName === 'isJPGChecked') {
      this.isAllChecked = !(this.isDiorChecked || this.isLancomeChecked || this.isJPGChecked);
      console.log(checkboxName, 'checkboxname: ')
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
    if (product.type && product.type.length > 0) {
      this.services.selectSize(product.type[0]);
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
