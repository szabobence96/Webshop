import { Component, Input, OnInit } from '@angular/core';
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
  task$ = collectionData(collection(this.firestore, 'JPG')) as Observable<ProductInterface[]>;


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

  }

  openModal(product: ProductInterface) {
    this.selectedProduct = product;
    this.isModalOpen = true;
    console.log('Kiválasztott termék:', product);
  }
}

