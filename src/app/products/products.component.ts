import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { navbarData } from '../sidenav/nav-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  constructor(private services: SharedService) { }
  cartItems: any[] = [];

  hawkers: any = [];
  hawkersWarwick: any = [];
  hawkersCS: any = [];
  hawkersCD: any = [];
  hawkersDL: any = [];
  hawkersOneRaw: any = [];


  ngOnInit() {
    this.services.refreshData(() => this.services.getHawkers(), this.hawkers);
    this.services.refreshData(() => this.services.getHawkersWarwick(), this.hawkersWarwick);
    this.services.refreshData(() => this.services.getHawkersCS(), this.hawkersCS);
    this.services.refreshData(() => this.services.getHawkersCD(), this.hawkersCD);
    this.services.refreshData(() => this.services.getHawkersDL(), this.hawkersDL);
    this.services.refreshData(() => this.services.getHawkersOneRaw(), this.hawkersOneRaw);
    this.cartItems = this.services.getCartItems();

    //console.log("hawkers tartalma:", this.hawkers); ellenőrzés hogy valóban feltötte-e a tömböt
  }

  navbarData = navbarData;

  addToCart(product: any) {

    const cartItems = this.services.getCartItems();
    const existingCartItem = cartItems.find(item => item.product.id === product.id);

    if (existingCartItem) {
      if (existingCartItem.quantity < 5) {
        existingCartItem.quantity++;
      }
    } else {
      this.services.addToCart(product);
    }
    const kosarElem = navbarData.find(item => item.routerLink === 'shopping-cart');
    if (kosarElem) {
      const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      kosarElem.badge = cartItemCount;
    }
  }
}
