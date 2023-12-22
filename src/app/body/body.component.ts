import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;
  @Input() closed = false;

  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 968) {
      styleClass = 'body-trimmed';
      console.log('styleclass:', styleClass)
    }
    if (this.closed && this.screenWidth <= 968 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
      styleClass = 'body-mobile-closed'
      console.log('styleclass:', styleClass)
    }


    return styleClass;
  }
}
