import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkeletonService {
  contentLoaded: boolean = false;

  constructor() {
    setTimeout(() => {
      this.contentLoaded = true;
    }, 2000);
  }
}
