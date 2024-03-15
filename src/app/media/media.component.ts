import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  screenWidth: number = 0;
  contentLoaded: boolean = false;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth
    setTimeout(() => {
      this.contentLoaded = true;
    }, 1000);
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    console.log('this.screenwidth: ', this.screenWidth)
  }
}
