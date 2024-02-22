import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { AngularFirestoreModule, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { Firestore, addDoc, collection, collectionData, getDocs, query } from '@angular/fire/firestore';
import { ProductInterface } from '../products/products.interface';
import { ModalService } from 'src/product-modal-helper/modal-service.service';
import { ProductService } from 'src/product-modal-helper/product-service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss', '../style-helper/product-style-helper.scss']
})
export class ProductsComponent implements OnInit {

  task$ = collectionData(collection(this.firestore, 'hawkers')) as Observable<ProductInterface[]>;
  contentLoaded: boolean = false;
  constructor(
    public services: SharedService,
    public firestore: Firestore,
    public modalService: ModalService,
    public productService: ProductService,
  ) { }

  ngOnInit() {
    this.task$.subscribe(data => console.log('task$ observable:', data));
    console.log(this.task$)
    setTimeout(() => {
      this.contentLoaded = true;
    }, 1500);
  }
}

