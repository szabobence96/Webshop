import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-cart-button',
  templateUrl: './custom-cart-button.component.html',
  styleUrls: ['./custom-cart-button.component.scss']
})
export class CustomCartButtonComponent {
  @Input() text: string = '';
}
