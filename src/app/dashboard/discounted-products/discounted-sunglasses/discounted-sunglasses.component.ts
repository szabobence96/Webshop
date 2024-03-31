import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, getDocs, query, where } from '@angular/fire/firestore';
import { ProductService } from 'src/app/product-modal-helper/product-service';

@Component({
  selector: 'app-discounted-sunglasses',
  templateUrl: './discounted-sunglasses.component.html',
  styleUrls: ['../../../style-helper/product-style-helper.scss']
})
export class DiscountedSunglassesComponent implements OnInit {

  constructor(
    public firestore: Firestore,
    public productService: ProductService,) {
  }

  sunglassesDiscount$ = collectionData(query(collection(this.firestore, 'hawkers'), where('discount', '==', true)));
  screenWidth: number = 0;
  contentLoaded: boolean = false;
  sectionInView: any = '';
  opacity: number = 0;

  ngOnInit(): void {
    setTimeout(() => {
      this.contentLoaded = true;
    }, 1000);
  }
}
