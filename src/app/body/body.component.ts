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
    if (this.collapsed && this.screenWidth > 1080) {
      styleClass = 'body-trimmed';
    }
    if (this.closed && this.screenWidth <= 1080 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
      styleClass = 'body-mobile-closed'
    }
    return styleClass;
  }
}