import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss']
})
export class SkeletonLoaderComponent implements OnInit {

  contentLoaded: boolean = false;
  ngOnInit(): void {
    setTimeout(() => {
      this.contentLoaded = true;
    }, 1000);
  }
}
