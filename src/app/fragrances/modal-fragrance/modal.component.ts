import { Component, EventEmitter, Output, OnInit, OnDestroy, Input, Renderer2, ElementRef, HostListener } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SharedService } from '../../shared.service';
import { ProductInterface } from '../../products/products.interface';
import { navbarData } from '../../sidenav/nav-data';
import { ModalService } from 'src/app/product-modal-helper/modal-service.service';
import { ProductService } from 'src/app/product-modal-helper/product-service';
import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['../../style-helper/modal-style-helper.scss']
})

export class ModalComponent implements OnInit {
  public routerSubscription: Subscription;

  constructor(
    private router: Router,
    public productService: ProductService,
    public modalService: ModalService,
    public services: SharedService) {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.modalService.closeModal();
      }
    });
  }
  @Input() product: any;
  contentLoaded: boolean = false;
  ngOnInit(): void {
    setTimeout(() => {
      this.contentLoaded = true;
    }, 500);
  }


}
