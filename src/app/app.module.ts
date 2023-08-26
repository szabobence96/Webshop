import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { WearComponent } from './wear/wear.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { ShoesComponent } from './shoes/shoes.component';
import { MediaComponent } from './media/media.component';
import { SharedService } from './shared.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { MyButtonComponent } from './my-button/my-button.component';


const firebaseConfig = {
  apiKey: "AIzaSyBUhtsLE6mKhnLFA4hrTdgtPRvT9DFPews",
  authDomain: "pelda-4422f.firebaseapp.com",
  projectId: "pelda-4422f",
  storageBucket: "pelda-4422f.appspot.com",
  messagingSenderId: "999999888137",
  appId: "1:999999888137:web:c55fe757b0ce70c8fcd1d8"
};

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    ProductsComponent,
    WearComponent,
    AccessoriesComponent,
    ShoesComponent,
    MediaComponent,
    ShoppingCartComponent,
    MyButtonComponent,
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
