import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { AngularFirestoreModule, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { Firestore, addDoc, collection, collectionData, getDocs, query } from '@angular/fire/firestore';
import { ProductInterface } from '../products/products.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['../fragrances/fragrances.component.scss']
})
export class ProductsComponent implements OnInit {
  task$ = collectionData(collection(this.firestore, 'hawkers')) as Observable<ProductInterface[]>;


  constructor(
    public services: SharedService,
    public firestore: Firestore
  ) { }

  isModalOpen = false;
  selectedProduct: any;

  closeModal() {
    this.isModalOpen = false;
  }

  ngOnInit() {
    this.task$.subscribe(data => console.log('task$ observable:', data));
    console.log(this.task$)

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

