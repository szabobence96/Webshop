import { Component } from '@angular/core';

interface SideNavToggle {
  screenwidth: number;
  collapsed: boolean;
  closed: boolean;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webshop';

  isSideNavCollapsed = false;
  isSideNavMobileClosed = false;
  isWholeToggled = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenwidth;
    this.isSideNavCollapsed = data.collapsed;
    this.isSideNavMobileClosed = data.closed;
  }
}
