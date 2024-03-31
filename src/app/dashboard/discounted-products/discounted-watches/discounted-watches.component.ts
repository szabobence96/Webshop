import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, getDocs, query, where } from '@angular/fire/firestore';
import { ProductService } from 'src/app/product-modal-helper/product-service';

@Component({
  selector: 'app-discounted-watches',
  templateUrl: './discounted-watches.component.html',
  styleUrls: ['../../../style-helper/product-style-helper.scss']
})
export class DiscountedWatchesComponent implements OnInit {

  constructor(
    public firestore: Firestore,
    public productService: ProductService,
  ) {
  }
  watchesDiscount$ = collectionData(query(collection(this.firestore, 'watches'), where('discount', '==', true)));
  screenWidth: number = 0;
  contentLoaded: boolean = false;
  sectionInView: any = '';
  opacity: number = 0;

  ngOnInit() {
    setTimeout(() => {
      this.contentLoaded = true;
    }, 1000);
  }
}
