import { Component, OnInit } from '@angular/core';
import { SkeletonService } from './skeleton-service.service';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent {
  constructor(public skeletonService: SkeletonService) { }
}
