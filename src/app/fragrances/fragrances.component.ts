import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { SharedService } from '../shared.service';
import { AngularFirestoreModule, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { Firestore, addDoc, collection, collectionData, getDocs, query } from '@angular/fire/firestore';
import { ProductInterface } from '../products/products.interface';

@Component({
  selector: 'app-fragrances',
  templateUrl: './fragrances.component.html',
  styleUrls: ['./fragrances.component.scss']
})
export class FragrancesComponent implements OnInit {
  fragrances$ = collectionData(collection(this.firestore, 'fragrances')) as Observable<ProductInterface[]>;

  constructor(
    public services: SharedService,
    public firestore: Firestore,
  ) { }

  isModalOpen = false;
  selectedProduct: any;


  closeModal() {
    this.isModalOpen = false;
  }

  ngOnInit() {
    this.fragrances$.subscribe(data => console.log('task$ observable:', data));
    console.log(this.fragrances$)

  }

  mouseOver(product: ProductInterface) {
    product.imagePath = product.modalImagePath[1];
  }

  mouseLeave(product: ProductInterface) {
    product.imagePath = product.modalImagePath[0]
  }


  openModal(product: ProductInterface) {
    this.selectedProduct = product;
    this.isModalOpen = true;
    console.log('Kiválasztott termék:', product);
    if (product.type && product.type.length > 0) {
      this.services.selectSize(product.type[0]);
    }
  }
}

