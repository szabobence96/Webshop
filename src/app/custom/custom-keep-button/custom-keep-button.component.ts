import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-keep-button',
  templateUrl: './custom-keep-button.component.html',
  styleUrls: ['./custom-keep-button.component.scss']
})
export class CustomKeepButtonComponent {
  @Input() text: string = "";
}
