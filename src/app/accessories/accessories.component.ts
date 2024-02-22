import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/product-modal-helper/product-service';
import { Firestore, addDoc, collection, collectionData, getDocs, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProductInterface } from '../products/products.interface';
import { SharedService } from '../shared.service';
import { ModalService } from 'src/product-modal-helper/modal-service.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.scss', '../style-helper/product-style-helper.scss']
})
export class AccessoriesComponent implements OnInit {
  contentLoaded: boolean = false;

  constructor(
    public productService: ProductService,
    public services: SharedService,
    public firestore: Firestore,
    public modalService: ModalService,
  ) {

  }
  accessories$ = collectionData(collection(this.firestore, 'accessories')) as Observable<ProductInterface[]>;

  ngOnInit() {
    setTimeout(() => {
      this.contentLoaded = true;
    }, 1500);
  }
}
