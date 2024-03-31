import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { SharedService } from '../shared.service';
import { SlideInOutAnimation } from './animation';

import 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { ProductService } from '../product-modal-helper/product-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fragrances',
  templateUrl: './fragrances.component.html',
  styleUrls: ['./fragrances.component.scss', '../style-helper/product-style-helper.scss'],
  animations: [SlideInOutAnimation]
})

export class FragrancesComponent implements OnInit {

  contentLoaded: boolean = false;
  jeanPaulBrandImg: string = './assets/images/commercial/jpg_logo.png';
  diorBrandImg: string = './assets/images/commercial/dior_logo.png';
  lancomeBrandImg: string = './assets/images/commercial/lancome_logo.png'
  screenWidth: number = 0;

  constructor(
    public services: SharedService,
    public firestore: Firestore,
    public productService: ProductService,
    public renderer: Renderer2,
  ) {
    this.updateImagesBasedOnScreenWidth();

  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    setTimeout(() => {
      this.contentLoaded = true;
    }, 1000);
  }

  animationState = 'out';
  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateImagesBasedOnScreenWidth();
  }
  images = [
    {
      imageSrc: './assets/images/commercial/scandal_commercial_ps_copy.jpg',
      imageAlt: 'scandal'
    },
    {
      imageSrc: './assets/images/commercial/dior_commercial_ps_copy.jpg',
      imageAlt: 'sauvage'
    },
  ]
  mobileImages = [
    {
      imageSrc: './assets/images/commercial/scandal_commercial_mobile_ps_copy.jpg',
    },
    {
      imageSrc: './assets/images/commercial/dior_commercial_mobile_ps_copy.jpg',
    },
  ]
  currentImages: any[] = this.images; // Kezdetben az eredeti képek lesznek beállítva

  private updateImagesBasedOnScreenWidth() {
    this.screenWidth = window.innerWidth;
    this.currentImages = this.screenWidth < 700 ? this.mobileImages : this.images;
  }
}

