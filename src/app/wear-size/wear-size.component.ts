import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-wear-size',
  templateUrl: './wear-size.component.html',
  styleUrls: ['./wear-size.component.scss']
})
export class WearSizeComponent {

  @Input() selectedSize: string = 'M' // Az aktuális kiválasztott méretet a komponens bemenetként várja
  @Output() sizeSelected = new EventEmitter<string>();


  selectSize(size: string) {
    this.selectedSize = size;
    console.log('selectedSize changed to:', this.selectedSize);
    this.sizeSelected.emit(size);
  }
}
