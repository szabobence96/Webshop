import { EventEmitter, Injectable, Input, Output, Renderer2, RendererFactory2 } from '@angular/core';
import { SharedService } from '../shared.service';
import 'firebase/firestore';
import { Firestore, } from '@angular/fire/firestore';
import { ProductService } from './product-service';
import { ProductAddedService } from './product-added.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    public services: SharedService,
    public firestore: Firestore,
    public productService: ProductService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.updateScreenWidth();
    window.addEventListener('resize', () => this.updateScreenWidth());
  }
  screenWidthChanged: EventEmitter<number> = new EventEmitter<number>();

  @Output() closeModalEvent = new EventEmitter();
  @Output() closeAddedModalEvent = new EventEmitter();
  @Input() product: any;
  screenWidth: number = 0;
  currentImage: string = '';
  showDetailsBox = false;

  updateScreenWidth() {
    this.screenWidth = window.innerWidth;
    this.screenWidthChanged.emit(this.screenWidth);
  }

  disableScroll() {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  enableScroll() {
    this.renderer.removeStyle(document.body, 'overflow');
  }

  showDetails() {
    this.showDetailsBox = !this.showDetailsBox;
  }
  changeMainImage(imagePath: string): void {
    this.currentImage = imagePath;
  }

  closeModal() {
    this.closeModalEvent.emit();
    this.services.selectedSize = null;
    this.services.selectedSizePrice = null;
    // this.services.selectedColor = null;
    this.renderer.removeStyle(document.body, 'overflow');
    this.productService.isModalOpen = false;
    this.showDetailsBox = false;
    this.services.currentImage = ""; //firebase eldobja, nem jegyzi meg
    this.currentImage = ""; // modal váltás miatt szükséges, dobja el a main image-t
  }

  addToCart(product: any) {
    this.services.addToCartService(product);
    this.closeModal();
  }
}
