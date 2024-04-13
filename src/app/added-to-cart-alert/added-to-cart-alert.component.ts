import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ModalService } from '../product-modal-helper/modal-service.service';
import { ProductService } from '../product-modal-helper/product-service';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
@Component({
  selector: 'app-added-to-cart-alert',
  templateUrl: './added-to-cart-alert.component.html',
  styleUrls: ['./added-to-cart-alert.component.scss']
})
export class AddedToCartAlertComponent implements OnInit, OnDestroy {
  public routerSubscription: Subscription;

  constructor(
    private router: Router,
    public sharedService: SharedService,
    public modalService: ModalService,
    public productService: ProductService
  ) {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.productService.closeAddedModal();
      }
    });
  }
  keepShopping: string = "Vásárlás folytatása"
  checkout: string = "Tovább a kosárhoz"
  @Input() product: any;
  ngOnInit(): void {
    this.modalService.disableScroll();
  }
  ngOnDestroy(): void {
    this.modalService.enableScroll();
  }
}
