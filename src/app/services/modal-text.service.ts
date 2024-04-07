import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalTextService {

  constructor() { }

  material: string = 'Anyaga: ';
  materialBelt: string = 'Szíj anyaga: ';

  frame: string = 'Keret: ';
  lens: string = 'Lencse: '
  size: string = 'Méret: ';
  waterproof: string = 'Vízállóság: ';
  productDetails: string = 'termékjellemző: ';

  clickForDetails: string = 'Kattintson a részletekért!';

  addToCart: string = 'Hozzáadás a kosárhoz'
}
