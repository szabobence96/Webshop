import { Component, Input, OnInit } from '@angular/core';
import { SkeletonService } from '../skeleton/skeleton-service.service';

interface carouselimage {
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnInit {
  constructor() { }

  @Input() images: carouselimage[] = []
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 3000;

  contentLoaded = false;
  selectedIndex: number = 0;

  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideImages();
    }
    setTimeout(() => {
      // Itt lehet a tartalmat előkészíteni vagy más műveleteket végezni
      this.contentLoaded = true; // A tartalom betöltődött, a skeletont eltávolítjuk
    }, 2000);
  }

  autoSlideImages(): void {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval);
  }

  selectImage(index: number): void {
    this.selectedIndex = index;
  }

  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick(): void {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

}
