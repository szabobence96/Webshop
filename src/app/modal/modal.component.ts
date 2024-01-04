import { Component, EventEmitter, Output, OnInit, Input, Renderer2, ElementRef, HostListener } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SharedService } from '../shared.service';
import { ProductInterface } from '../products/products.interface';
import { navbarData } from '../sidenav/nav-data';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {
  @Input() product: any;
  @Output() closeModalEvent = new EventEmitter();
  currentImage: string = '';
  screenWidth: number = 0;
  constructor(
    private db: AngularFireDatabase,
    public services: SharedService,
    private el: ElementRef,
  ) {
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }
  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }

  showDetailsBox = false;

  showDetails() {
    this.showDetailsBox = !this.showDetailsBox;
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
