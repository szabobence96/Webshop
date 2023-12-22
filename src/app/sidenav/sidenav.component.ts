import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { navbarData } from './nav-data';

interface SideNavToggle {
  screenwidth: number;
  collapsed: boolean;
  closed: boolean;
}


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('90ms 300ms',
          style({ opacity: 1 })
        )
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('90ms',
          style({ opacity: 0 })
        )
      ])
    ]),

    trigger('rotate', [
      transition(':enter', [
        animate('430ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(0.5turn)', offset: '1' })
          ])
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  closed = false;
  screenwidth = 0;
  navData = navbarData;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenwidth = window.innerWidth;
    if (this.screenwidth <= 968) {
      this.collapsed = false;
      this.closed = false;
      this.onToggleSideNav.emit({ closed: this.closed, collapsed: this.collapsed, screenwidth: this.screenwidth });
    }
  }

  ngOnInit(): void {
    this.screenwidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ closed: this.closed, collapsed: this.collapsed, screenwidth: this.screenwidth });
    if (this.collapsed === false) {
      this.closed = false;

    }
    console.log('toggle collapsed?: ', this.collapsed)
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ closed: this.closed, collapsed: this.collapsed, screenwidth: this.screenwidth });
    this.closed = false;
    console.log('close sidenav collapsed?: ', this.collapsed)

  }

  toggleClose(): void {
    this.closed = !this.closed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, closed: this.closed, screenwidth: this.screenwidth });
    console.log('toggleClose?: ', this.closed)
  }
}
