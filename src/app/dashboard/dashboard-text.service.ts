import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardTextService {

  constructor() { }

  discountedWatches: string = 'Kedvezményes óráink';

  loremIps: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. '
  more: string = 'Tudjon meg többet!'
  ourSunglasses: string = 'Forgalmazott napszemüvegek'
  ourFragrances: string = 'Forgalmazott parfümök'
  hawkers: string = 'Tekintse meg legújabb Hawkers napszemüvegeket széles kínálatunkban.'
  goToProducts: string = 'Tovább a termékekhez!'
  labella: String = 'Minden férfit magához vonz, és tökéletes párt alkot a Jean Paul Gaultier Le Male Le Parfum férfi illattal – ez a Jean Paul Gaultier La Belle Le Parfum női illat, amelynek nagyon nehéz ellenállni. Újabb termés Jean Paul Gaultier képzeletbeli kertjéből, ahol minden bűn megengedett.'
  lebeau: String = 'A férfi Jean Paul Gaultier Le Beau üvegcséjének az alakja egy izmos férfitorzó, amelyet csak egy levél takar. Úgy néz ki, mintha egyenesen a Paradicsomból lépett volna elő. Azonban az ő esetében szó sincs tiltott gyümölcsről. Egyértelműen kóstolásra késztető, friss, függőséget kiváltó illat.'
  readMore: string = 'Olvasson többet a márkáról!'
}
