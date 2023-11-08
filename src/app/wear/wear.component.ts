import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { navbarData } from '../sidenav/nav-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './wear.component.html',
  styleUrls: [ '../products/products.component.scss', './wear.component.scss']
})
export class WearComponent {
  constructor(private services: SharedService) { }

  nikeAzur: any = [];
  
  refreshData(dataGetter: () => Observable<any[]>, targetArray: any[]) {
    dataGetter().subscribe((res) => {
      targetArray.push(...res);
    });
  }

  ngOnInit() {
    this.refreshData(() => this.services.getNikeAzur(), this.nikeAzur);
    //console.log("hawkers tartalma:", this.hawkers); ellenőrzés hogy valóban feltötte-e a tömböt

  }
  addToCart(product: any) {
    const kosarElem = navbarData.find(item => item.routerLink === 'shopping-cart');
    if (kosarElem) {
      kosarElem.badge = (kosarElem.badge || 0) + 1;
    }
    this.services.addToCart(product); // Ezt a metódust a SharedService-ben kell implementálni
  }
}
