import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FragranceCarouselComponent } from './fragrance-carousel.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
    declarations: [
        FragranceCarouselComponent
    ],
    imports: [
        CommonModule,
        NgxSkeletonLoaderModule
    ],
    exports: [
        FragranceCarouselComponent
    ]
})
export class fragranceCarouselModule { }
