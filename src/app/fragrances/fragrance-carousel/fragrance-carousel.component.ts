import { Component, Input, OnInit } from '@angular/core';

interface carouselimage {
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-fragrance-carousel',
  templateUrl: './fragrance-carousel.component.html',
  styleUrls: ['./fragrance-carousel.component.scss']
})


export class FragranceCarouselComponent implements OnInit {
  constructor() { }

  @Input() images: carouselimage[] = []
  @Input() indicators = true;
  @Input() controls = false;
  @Input() autoSlide = false;
  @Input() slideInterval = 4000;

  contentLoaded = false;
  selectedIndex: number = 0;

  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideImages();
    }
    setTimeout(() => {
      this.contentLoaded = true;
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