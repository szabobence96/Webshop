import { Component } from '@angular/core';

interface SideNavToggle {
  screenwidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web';

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenwidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
