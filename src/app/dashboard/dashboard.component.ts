import { Component, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Firestore, addDoc, collection, collectionData, getDocs, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProductInterface } from '../products/products.interface';
import { ProductService } from 'src/app/product-modal-helper/product-service';
import { DashboardTextService } from './dashboard-text.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../style-helper/product-style-helper.scss'],
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
      state('true', style({ filter: 'brightness(0.4)' })),
      state('false', style({ filter: 'brightness(1.0)' })),
      transition('false => true', animate('800ms ease-in')),
    ]),
  ]
})

export class DashboardComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    public firestore: Firestore,
    private renderer: Renderer2,
    public productService: ProductService,
    public textService: DashboardTextService
  ) {
    this.updateImagesBasedOnScreenWidth();
  }

  watchesDiscount$ = collectionData(query(collection(this.firestore, 'watches'), where('discount', '==', true)));
  screenWidth: number = 0;
  contentLoaded: boolean = false;
  sectionInView: any = '';
  opacity: number = 0;
  imgPc: string = './assets/images/commercial/media_background.jpg';
  imgMobile: string = './assets/images/commercial/media_background_mobile.jpg';
  ngOnInit() {
    setTimeout(() => {
      this.contentLoaded = true;
    }, 1000);
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const sections = ['a'];

    sections.forEach(section => {
      const el = this.elementRef.nativeElement.querySelector(`#${section}`);
      const rect = el.getBoundingClientRect();

      if (rect.top >= 10 && rect.bottom <= window.innerHeight) {
        this.sectionInView = section;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateImagesBasedOnScreenWidth();
  }
  images = [
    {
      imageSrc: './assets/images/commercial/commercial_police_watch_ps.webp',
      imageAlt: 'watch',
      caption: 'POLICE órák & kiegészítők',
      button: 'Tovább a kollekciókra!',
      routerLink: '/accessories/'
    },
    {
      imageSrc: './assets/images/commercial/commercial_fragrance_ps.webp',
      imageAlt: 'fragrance',
      caption: 'Parfümök széles választéka',
      button: 'Tovább a parfümökre!',
      routerLink: '/fragrances/'
    },

  ]
  mobileImages = [

    {
      imageSrc: './assets/images/commercial/commercial_police_watch_ps_mobile.webp',
      imageAlt: 'watch',
      caption: 'POLICE órák & kiegészítők',
      button: 'Tovább a kollekciókra!',
      routerLink: '/accessories/'
    },
    {
      imageSrc: './assets/images/commercial/commercial_fragrance_ps_mobile.webp',
      imageAlt: 'fragrance',
      caption: 'Parfümök széles választéka',
      button: 'Tovább a parfümökre!',
      routerLink: '/fragrances/'
    },
  ]
  currentImages: any[] = this.images;

  private updateImagesBasedOnScreenWidth() {
    this.screenWidth = window.innerWidth;
    this.currentImages = this.screenWidth < 700 ? this.mobileImages : this.images;
  }
}
