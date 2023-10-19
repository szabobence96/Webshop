import { Component, Input } from '@angular/core';
import { SharedService } from '../shared.service';
import { Observable } from 'rxjs';
import { navbarData } from '../sidenav/nav-data';

@Component({
  selector: 'app-statistics',
  templateUrl: './wear.component.html',
  styleUrls: [ './wear.component.scss']
})
export class WearComponent {
  constructor(private services: SharedService) { }
  cartItems: any[] = [];
  selectedSize: string = 'M'; // A kiválasztott méret tárolásához szükséges változó

  nikeBlack: any = [];
  nikeAzur: any = [];
  isExpanded = false;

  // ...

  toggleCard() {
    this.isExpanded = !this.isExpanded;
  }
  // Metódus a méret kiválasztására
  selectSize(size: string) {
    this.selectedSize = size;
    console.log('selectedSize changed to:', this.selectedSize);
  }

  refreshData(dataGetter: () => Observable<any[]>, targetArray: any[]) {
    dataGetter().subscribe((res) => {
      targetArray.push(...res);
    });
  }
  
  
  ngOnInit() {
    this.refreshData(() => this.services.getNikeAzur(), this.nikeAzur);
    this.refreshData(() => this.services.getNikeBlack(), this.nikeBlack);

    //console.log("hawkers tartalma:", this.hawkers); ellenőrzés hogy valóban feltötte-e a tömböt
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
