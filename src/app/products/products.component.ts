import { Component, ElementRef, HostListener, Input, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../shared.service';
import { AngularFirestoreModule, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { Firestore, addDoc, collection, collectionData, getDocs, query } from '@angular/fire/firestore';
import { ProductInterface } from '../products/products.interface';
import { ModalService } from 'src/app/product-modal-helper/modal-service.service';
import { ProductService } from 'src/app/product-modal-helper/product-service';
import { trigger, state, animate, transition, style } from '@angular/animations';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss', '../style-helper/product-style-helper.scss'],
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
export class ProductsComponent implements OnInit {

  task$ = collectionData(collection(this.firestore, 'hawkers')) as Observable<ProductInterface[]>;

  contentLoaded: boolean = false;
  videoLoaded: boolean = false;
  screenWidth: number = 0;
  sectionInView: any = '';

  constructor(
    public services: SharedService,
    public firestore: Firestore,
    public modalService: ModalService,
    public productService: ProductService,
    private elementRef: ElementRef,

  ) { }

  private imageBlurTimeout: any;
  private textTimeout: any;

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.task$.subscribe(data => console.log('task$ observable:', data));
    console.log(this.task$)

    setTimeout(() => {
      this.contentLoaded = true;
    }, 1000);

    this.imageBlurTimeout = setTimeout(() => {
      const imageBlur = document.querySelector('.commercial-watch-text-container') as HTMLElement;
      if (imageBlur) {
        imageBlur.classList.add('fade-in');
      }
    }, 2000);

    this.textTimeout = setTimeout(() => {
      const imageBlur = document.querySelector('.commercial-watch-text') as HTMLElement;
      if (imageBlur) {
        imageBlur.classList.add('fade-in');
      }
    }, 3000);
  }

  ngOnDestroy() {
    clearTimeout(this.textTimeout)
    clearTimeout(this.imageBlurTimeout);
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

      if (rect.top >= 2 && rect.bottom <= window.innerHeight) {
        this.sectionInView = section;
      }
    });
  }
}

