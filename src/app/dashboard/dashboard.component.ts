import { Component, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { TextService } from '../services/text-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public textService: TextService, private elementRef: ElementRef, private renderer: Renderer2) {
    this.updateImagesBasedOnScreenWidth();
  }
  showContent: boolean = false;
  ngOnInit(): void {
    setTimeout(() => {
      this.showContent = true;
    }, 2000);
  }
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const removeBrightness = this.elementRef.nativeElement.querySelector('#remove-brightness');
    const addBrightness = this.elementRef.nativeElement.querySelector('#add-brightness');
    const firstTextElement = this.elementRef.nativeElement.querySelector('#first-text-animation');
    const secondTextElement = this.elementRef.nativeElement.querySelector('#second-text-animation');
    const delayedElement = this.elementRef.nativeElement.querySelector('#delayed-element');
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const sectionOffset = removeBrightness.offsetTop;
    const sectionAddset = addBrightness.offsetTop;
    const screenHeight = window.innerHeight;

    if (scrollPosition + screenHeight >= sectionOffset) {
      this.renderer.addClass(removeBrightness, 'a-remove-brightness');
      this.renderer.addClass(firstTextElement, 'a-first-text');
      this.renderer.addClass(delayedElement, 'a-delayed');
    }
    if (scrollPosition + screenHeight >= sectionAddset) {
      this.renderer.addClass(addBrightness, 'a-add-brightness');
    }
  }

  screenWidth: number = 0;
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
    this.currentImages = this.screenWidth < 768 ? this.mobileImages : this.images;
  }
}
