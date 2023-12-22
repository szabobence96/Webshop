import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { SharedService } from '../shared.service';
import { AngularFirestoreModule, AngularFirestoreCollection, DocumentData } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { Observable, map } from 'rxjs';
import { Firestore, addDoc, collection, collectionData, getDocs, query, where } from '@angular/fire/firestore';
import { ProductInterface } from '../products/products.interface';
import { FragranceServiceService } from './fragrance-service.service';

@Component({
  selector: 'app-fragrances',
  templateUrl: './fragrances.component.html',
  styleUrls: ['./fragrances.component.scss']
})
export class FragrancesComponent {


  jeanPaulBrandImg: string = './assets/images/fragrances/logo/jeanpaul_logo.jpg';
  diorBrandImg: string = './assets/images/fragrances/logo/dior_logo.jpg';
  lancomeBrandImg: string = './assets/images/fragrances/logo/lancome_logo.jpg'

  constructor(
    public services: SharedService,
    public firestore: Firestore,
    public fragranceService: FragranceServiceService
  ) { }

}

