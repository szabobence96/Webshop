import { Component, EventEmitter, Output, OnInit, Input  } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit{

  //@Input() productId: number | undefined;
  @Input() product: any;
  @Output() closeModalEvent = new EventEmitter();
  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    // Firebase-ből lekérdezzük a termék adatait a megadott productId alapján
    /*
    this.db.object(`JPG/${this.productId}`).valueChanges().subscribe((data: any) => {
      this.productId = data;
    });
    */
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}
