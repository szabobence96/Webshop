import { Component, Renderer2 } from '@angular/core';
import { SharedService } from '../shared.service';
import { SlideInOutAnimation } from './animation';

import 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { ProductService } from '../../product-modal-helper/product-service';

@Component({
  selector: 'app-fragrances',
  templateUrl: './fragrances.component.html',
  styleUrls: ['./fragrances.component.scss', '../style-helper/product-style-helper.scss'],
  animations: [SlideInOutAnimation]
})
export class FragrancesComponent {

  animationState = 'out';
  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      console.log(this.animationState);
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      console.log(this.animationState);
    }
  }

  jeanPaulBrandImg: string = './assets/images/fragrances/logo/jeanpaul_logo.jpg';
  diorBrandImg: string = './assets/images/fragrances/logo/dior_logo.jpg';
  lancomeBrandImg: string = './assets/images/fragrances/logo/lancome_logo.jpg'

  constructor(
    public services: SharedService,
    public firestore: Firestore,
    public productService: ProductService,
    public renderer: Renderer2
  ) { }

}

