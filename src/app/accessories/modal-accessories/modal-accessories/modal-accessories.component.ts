import { Component, EventEmitter, Output, OnInit, Input, Renderer2, ElementRef, HostListener } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SharedService } from '../../../shared.service';
import { ProductInterface } from '../../../products/products.interface';
import { navbarData } from '../../../sidenav/nav-data';
import { ProductService } from 'src/product-modal-helper/product-service';
import { ModalService } from 'src/product-modal-helper/modal-service.service';

@Component({
  selector: 'app-modal-accessories',
  templateUrl: './modal-accessories.component.html',
  styleUrls: ['../../../style-helper/modal-style-helper.scss']
})
export class ModalAccessoriesComponent {
  constructor(
    public productService: ProductService,
    public modalService: ModalService,
    public services: SharedService) {
  }
  @Input() product: any;


  test() {
    console.log(this.product)
  }

}
