import { Component, OnInit, Renderer2 } from '@angular/core';
import { SharedService } from '../shared.service';
import { SlideInOutAnimation } from './animation';

import 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { ProductService } from '../../product-modal-helper/product-service';
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

  constructor(
    public services: SharedService,
    public firestore: Firestore,
    public productService: ProductService,
    public renderer: Renderer2,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.contentLoaded = true;
    }, 1500);
  }

  animationState = 'out';
  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      console.log(this.animationState);
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      console.log(this.animationState);
    }
  }



}

