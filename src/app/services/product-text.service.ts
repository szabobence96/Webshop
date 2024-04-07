import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ProductTextService {
    constructor() { }
    price: string = 'Ft';
    priceFrom: string = 'Ft-tól';
    originalPrice: string = 'Ft-ról'
    discountAmount: string = '10% Kedvezmény';
}