import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Output() closeModalEvent = new EventEmitter();
  @Input() productName: any; // Változó az adatok tárolásához
  @Input() productPrice: any; // Változó az adatok tárolásához
  @Input() productPath: any; // Változó az adatok tárolásához

  @Input() currentPrice: any;

  closeModal() {
    this.closeModalEvent.emit();
  }
}
