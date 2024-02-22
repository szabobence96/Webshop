import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { AuthenticationService } from '../services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc, } from '@angular/fire/firestore';
import { take } from 'rxjs';
import { DocumentReference } from '@firebase/firestore';
import { AngularFirestore, fromDocRef } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss', '../shopping-cart/shopping-cart.component.scss']
})
export class ShippingComponent implements OnInit {
  shippingForm = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    }
  );

  get email() {
    return this.shippingForm.get('email');
  }

  get address() {
    return this.shippingForm.get('address');
  }

  get firstName() {
    return this.shippingForm.get('firstName');
  }

  get lastName() {
    return this.shippingForm.get('lastName');
  }

  get phone() {
    return this.shippingForm.get('phone');
  }

  constructor(
    private fb: NonNullableFormBuilder,
    public services: SharedService,
    private authService: AuthenticationService,
    public shoppingService: ShoppingCartService,
    public usersService: UsersService,
    private toast: HotToastService,
    private router: Router,
    private firestore: Firestore,
    private formbuilder: FormBuilder,
    private afs: AngularFirestore

  ) { }

  contentLoaded: boolean = false;
  termsChecked: boolean = false;
  orderId: string = '';


  termsCheck(event: MouseEvent) {
    event.stopPropagation();
    if (event.target !== event.currentTarget) {
      // A kattintás csak akkor történik meg, ha a mat-checkbox-en kívülre kattintasz
      this.termsChecked = !this.termsChecked;
    }
  }

  ngOnInit() {
    if (this.services.getCartItems().length === 0) {
      this.router.navigateByUrl('/shopping-cart');
    }
    setTimeout(() => {
      this.contentLoaded = true;
    }, 1000);
    this.user$.subscribe(userProfile => {
      if (userProfile) {
        this.shippingForm.patchValue({
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          email: userProfile.email,
          phone: userProfile.phone,
          address: userProfile.address,
        });
      }
    });
  }

  user$ = this.usersService.currentUserProfile$;
  price = this.shoppingService.calculateTotalPayment()
  items = this.services.getCartItems()
  gift = this.shoppingService.giftIsChecked;
  insurance = this.shoppingService.insuranceIsChecked;
  shippingPrice = this.shoppingService.shippingPrice;
  orderDate = new Date();

  async rendelesFormSubmit(formValue: any) {
    const { firstName, lastName, email, phone, address } = this.shippingForm.value;
    if (!this.shippingForm.valid || !firstName || !lastName || !email || !phone || !address) {
      return;
    }
    try {
      const user = await this.user$.pipe(take(1)).toPromise();
      let rendelesCollection;
      if (user) {
        rendelesCollection = collection(this.firestore, '*orders');
      } else {
        rendelesCollection = collection(this.firestore, '*guest');
      }
      formValue.items = this.items;
      formValue.gift = this.gift;
      formValue.insurance = this.insurance;
      formValue.shippingPrice = this.shippingPrice;
      formValue.price = this.price;
      formValue.orderDate = this.orderDate;
      this.services.placedOrder = true;
      this.router.navigate(['/landing']);
      await addDoc(rendelesCollection, formValue);
      console.log('Rendelés elküldve a Firestore-ba');
      this.shippingForm.reset();
      this.services.clearCart();
    } catch (error) {
      console.error('Hiba történt a rendelés elküldése során: ', error);
    }
  }
}
