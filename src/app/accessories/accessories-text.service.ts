import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class AccessoriesTextService {

    constructor() { }

    price: string = 'Ft';
    priceFrom: string = 'Ft-tól';
    originalPrice: string = 'Ft-ról'
    discountAmount: string = '10% Kedvezmény';
    discountHeader: string = '- 10%'
    discountDesc: string = 'Az akcióban résztvevő órákra!';

}
