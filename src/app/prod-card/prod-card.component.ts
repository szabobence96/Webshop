import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { SharedService } from '../shared.service';
import { navbarData } from '../sidenav/nav-data';

@Component({
  selector: 'app-prod-card',
  templateUrl: './prod-card.component.html',
  styleUrls: ['./prod-card.component.scss']
})
export class ProdCardComponent {
  constructor(public services: SharedService) { }

  @Output() sizeSelected = new EventEmitter<string>();
  @Input() productCardHead: string = '';
  @Input() productImage: string = '';
  @Input() productDescription: string = '';
  @Input() productCardPrice: number = 1;
  @Input() productSelectedSize: string = 'M';

  product: any; // Itt tároljuk majd az adott termék adatait
  selectedSize: string = 'M'; // A kiválasztott méret tárolásához szükséges változó
  cartItem: any[] = [];
  selectedItem: any;


  selectSize(size: string) {
    this.selectedSize = size;
    console.log('selectedSize changed to:', this.selectedSize);
  }

  

  addToCart(product: any) {
    const size = this.selectedSize;
    const cartItems = this.services.getCartItems();

    // Itt külön választjuk ki az azonos méretű termékeket
    const existingItemsWithSameSize = cartItems.filter(item => item.product.id === product.id && item.product.selectedSize === size);

    if (existingItemsWithSameSize.length > 0) {
      // Ha már vannak azonos méretű termékek a kosárban
      const totalQuantity = existingItemsWithSameSize.reduce((sum, item) => sum + item.quantity, 0);

      if (totalQuantity < 5) {
        // Ha az azonos méretű termékek összes mennyisége kevesebb, mint 5, növeljük a mennyiséget
        existingItemsWithSameSize[0].quantity++;
      }
    } else if (cartItems.length < 5) {
      // Ha nincsenek azonos méretű termékek a kosárban, és a kosár még nem érte el a 5 termék limitet
      this.services.addToCart({ ...product, selectedSize: size });
    }

    const kosarElem = navbarData.find(item => item.routerLink === 'shopping-cart');
    if (kosarElem) {
      const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      kosarElem.badge = cartItemCount;
    }
  }
}
