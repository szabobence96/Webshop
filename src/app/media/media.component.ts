import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  screenWidth: number = 0;
  contentLoaded: boolean = false;
  imgPc: string = './assets/images/commercial/media_background1.jpg';
  imgMobile: string = './assets/images/commercial/media_background1_mobile.jpg';

  private imageBlurTimeout: any;
  private textTimeout: any;

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    setTimeout(() => {
      this.contentLoaded = true;
    }, 1000);

    this.imageBlurTimeout = setTimeout(() => {
      const imageBlur = document.querySelector('.commercial-watch-text-container') as HTMLElement;
      if (imageBlur) {
        imageBlur.classList.add('fade-in');
      }
    }, 1500);

    this.imageBlurTimeout = setTimeout(() => {
      const imageBlur = document.querySelector('img') as HTMLElement;
      if (imageBlur) {
        imageBlur.classList.add('fade-in-img');
      }
    }, 1200);

    this.textTimeout = setTimeout(() => {
      const imageBlur = document.querySelector('.commercial-watch-text-1') as HTMLElement;
      if (imageBlur) {
        imageBlur.classList.add('fade-in');
      }
    }, 2000);
    this.textTimeout = setTimeout(() => {
      const imageBlur = document.querySelector('.commercial-watch-text-2') as HTMLElement;
      if (imageBlur) {
        imageBlur.classList.add('fade-in');
      }
    }, 2300);
    this.textTimeout = setTimeout(() => {
      const imageBlur = document.querySelector('.commercial-watch-text-3') as HTMLElement;
      if (imageBlur) {
        imageBlur.classList.add('fade-in');
      }
    }, 2600);
  }

  ngOnDestroy() {
    clearTimeout(this.textTimeout)
    clearTimeout(this.imageBlurTimeout);
  }



  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }
}
