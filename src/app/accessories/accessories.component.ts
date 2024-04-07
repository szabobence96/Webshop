import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ProductService } from 'src/app/product-modal-helper/product-service';
import { Firestore, addDoc, collection, collectionData, getDocs, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProductInterface } from '../products/products.interface';
import { SharedService } from '../shared.service';
import { ModalService } from 'src/app/product-modal-helper/modal-service.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';
import { AccessoriesTextService } from './accessories-text.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.scss', '../style-helper/product-style-helper.scss'],
  animations: [
    trigger('fadeInA', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('false => true', animate('800ms 1200ms ease-in')),
    ]),
    trigger('fadeInADelayed', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('false => true', animate('800ms 2000ms ease-in')),
    ]),
    trigger('fadeInB', [
      state('true', style({ filter: 'brightness(0.2)' })),
      state('false', style({ filter: 'brightness(1.0)' })),
      transition('false => true', animate('800ms ease-in')),
    ]),
  ]
})
export class AccessoriesComponent implements OnInit {
  contentLoaded: boolean = false;

  constructor(
    public productService: ProductService,
    public services: SharedService,
    public firestore: Firestore,
    public modalService: ModalService,
    public textService: AccessoriesTextService,
    private elementRef: ElementRef,
  ) { }

  accessories$ = collectionData(collection(this.firestore, 'accessories')) as Observable<ProductInterface[]>;
  watches$ = collectionData(collection(this.firestore, 'watches')) as Observable<ProductInterface[]>;

  screenWidth: number = 0;
  sectionInView: any = '';

  imgPc: string = './assets/images/commercial/police_watch_commercial.jpg';
  imgMobile: string = './assets/images/commercial/police_watch_commercial_mobile_copy.jpg';
  imgLogo: string = './assets/images/commercial/police_logo.svg';

  getDiscountPrice() {

  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    console.log(this.screenWidth)
    setTimeout(() => {
      this.contentLoaded = true;
    }, 1000);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const sections = ['d'];

    sections.forEach(section => {
      const el = this.elementRef.nativeElement.querySelector(`#${section}`);
      const rect = el.getBoundingClientRect();

      if (rect.top >= 10 && rect.bottom <= window.innerHeight) {
        this.sectionInView = section;
      }
    });
  }
}
