import { HotToastModule } from '@ngneat/hot-toast';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { MediaComponent } from './media/media.component';
import { SharedService } from './shared.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { UserHeaderComponent } from './user-header/user-header.component';
import { LoginComponent } from './login-reg-landing/login/login.component';
import { SignUpComponent } from './login-reg-landing/sign-up/sign-up.component';
import { LandingComponent } from './login-reg-landing/landing/landing.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { OrdersComponent } from './login-reg-landing/orders/orders.component';
import { ProfileComponent } from './login-reg-landing/profile/profile.component';
import { ShippingComponent } from './shipping/shipping.component';
import { FirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CarouselModule } from './carousel/carousel.module';
import { FragrancesComponent } from './fragrances/fragrances.component';
import { ModalComponent } from './fragrances/modal-fragrance/modal.component';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { ModalProductsComponent } from './products/modal-products/modal-products.component';
import { DiorComponent } from './brands/dior/dior.component';
import { JeanPaulGaultierComponent } from './brands/jean-paul-gaultier/jean-paul-gaultier.component';
import { DiorFragrancesComponent } from './fragrances/dior-fragrances/dior-fragrances/dior-fragrances.component';
import { JPGFragrancesComponent } from './fragrances/JPG-fragrances/jpg-fragrances/jpg-fragrances.component';
import { LancomeFragrancesComponent } from './fragrances/lancome-fragrances/lancome-fragrances.component';
import { WomanFragrancesComponent } from './fragrances/woman-fragrances/woman-fragrances.component';
import { ManFragrancesComponent } from './fragrances/man-fragrances/man-fragrances.component';
import { UserComponent } from './user/user.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LancomeComponent } from './brands/lancome/lancome.component';
import { HawkersComponent } from './brands/hawkers/hawkers.component';
import { SettingsButtonComponent } from './settings-button/settings-button.component';
import { ModalAccessoriesComponent } from './accessories/modal-accessories/modal-accessories/modal-accessories.component';

const firebaseConfig = {
  apiKey: "AIzaSyBUhtsLE6mKhnLFA4hrTdgtPRvT9DFPews",
  authDomain: "pelda-4422f.firebaseapp.com",
  projectId: "pelda-4422f",
  storageBucket: "pelda-4422f.appspot.com",
  messagingSenderId: "999999888137",
  appId: "1:999999888137:web:c55fe757b0ce70c8fcd1d8",
  useEmulator: true, // Firestore Emulator használata (fejlesztési környezetben)
  experimentalForceLongPolling: true, // Hosszú polling engedélyezése Firestore cache-hoz
};

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    ProductsComponent,
    AccessoriesComponent,
    FragrancesComponent,
    MediaComponent,
    ShoppingCartComponent,
    UserComponent,
    UserHeaderComponent,
    LoginComponent,
    SignUpComponent,
    LandingComponent,
    LancomeComponent,
    HawkersComponent,
    OrdersComponent,
    ProfileComponent,
    ShippingComponent,
    ModalComponent,
    ModalProductsComponent,
    DiorComponent,
    JeanPaulGaultierComponent,
    DiorFragrancesComponent,
    JPGFragrancesComponent,
    LancomeFragrancesComponent,
    WomanFragrancesComponent,
    ManFragrancesComponent,
    CustomButtonComponent,
    SettingsButtonComponent,
    ModalAccessoriesComponent,
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    MatFormFieldModule,
    FirestoreModule,
    NgxSkeletonLoaderModule,
    CommonModule,
    CarouselModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    provideAuth(() => getAuth()),
  ],
  providers: [SharedService, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
