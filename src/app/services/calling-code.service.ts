import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CallingCodeService {

  constructor() { }
  first: boolean = true;
  getCallingCodes(): string[] {
    let callingCodes = ['+36', '+33', '+44', '+43', '+32', '+420', '+372', '+30', '+39', '+45', '+352', '+358'];
    callingCodes.sort((a, b) => {
      if (a === '+36') {
        return -1;
      } else if (b === '+36') {
        return 1;
      } else {
        return a.localeCompare(b);
      }
    });

    return callingCodes;
  }

}
