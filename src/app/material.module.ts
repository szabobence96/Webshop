import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatIconModule
  ]
})
export class MaterialModule { }
