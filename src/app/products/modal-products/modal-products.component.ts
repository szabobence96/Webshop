import { Component, EventEmitter, Output, OnInit, Input, Renderer2 } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SharedService } from '../../shared.service';
import { ProductInterface } from '../../products/products.interface';
import { navbarData } from '../../sidenav/nav-data';

@Component({
  selector: 'app-modal-products',
  templateUrl: './modal-products.component.html',
  styleUrls: ['./modal-products.component.scss']
})
export class ModalProductsComponent implements OnInit {

  @Input() product: any;
  @Output() closeModalEvent = new EventEmitter();
  currentImage: string = '';

  constructor(
    private db: AngularFireDatabase,
    public services: SharedService,
    private renderer: Renderer2,
  ) {
  }

  ngOnInit() {

  }
  changeMainImage(imagePath: string): void {
    this.currentImage = imagePath;
    console.log('imagePath value: ', imagePath)
  }

  closeModal() {
    this.closeModalEvent.emit();
    this.services.selectedSize = null;
    this.services.selectedSizePrice = null;
    console.log('bezárt modal értéke: ', this.services.selectedSize, this.services.selectedSizePrice)
  }

  addToCart(product: any) {
    this.services.addToCartService(product);
    this.closeModal();

  }
}