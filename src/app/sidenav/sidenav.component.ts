import { Component, Output, EventEmitter, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { navbarData } from './nav-data';
import { SharedService } from '../shared.service';
import { ModalService } from 'src/app/product-modal-helper/modal-service.service';
import { ProductService } from 'src/app/product-modal-helper/product-service';

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
        animate('0ms',
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
  opened = false;
  screenwidth = 0;
  navData = navbarData;
  element: HTMLElement | any
  constructor(public modalService: ModalService, private elementRef: ElementRef, public productService: ProductService) { }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.opened = false;
      this.collapsed = false;
      this.onToggleSideNav.emit({ closed: this.closed, collapsed: this.collapsed, screenwidth: this.screenwidth });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenwidth = window.innerWidth;
    if (this.screenwidth <= 700) {
      this.collapsed = false;
      this.closed = true;
      this.opened = false;
      this.onToggleSideNav.emit({ closed: this.closed, collapsed: this.collapsed, screenwidth: this.screenwidth });
    } if (this.screenwidth > 700) {
      this.collapsed = false;
      this.closed = false;
      this.opened = false;
      this.onToggleSideNav.emit({ closed: this.closed, collapsed: this.collapsed, screenwidth: this.screenwidth });
    }
  }

  lastScrollPosition = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {

    const scrollThreshold = 200;
    const currentScrollPosition = window.scrollY;
    if (Math.abs(currentScrollPosition - this.lastScrollPosition) > scrollThreshold) {
      if (currentScrollPosition > this.lastScrollPosition) {
        console.log('Scrolling Down');
        if (this.element) {
          this.element.style.opacity = '0';
          this.element.style.transition = 'opacity 0.2s ease-in-out';
          this.element.style.pointerEvents = 'none';
        }
      } else {
        console.log('Scrolling Up');
        if (this.element) {
          this.element.style.opacity = '1';
          this.element.style.transition = 'opacity 0.2s ease-in-out';
          this.element.style.pointerEvents = 'auto';
        }
      }
      this.lastScrollPosition = currentScrollPosition;
    }
  }

  ngOnInit(): void {
    this.screenwidth = window.innerWidth;
    this.element = document.querySelector('.sidenav-link-open');
    if (window.innerWidth <= 700) {
      this.closed = true;
      this.onToggleSideNav.emit({ closed: this.closed, collapsed: this.collapsed, screenwidth: this.screenwidth });
    }
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

  toggleOpen(): void {
    this.opened = !this.opened;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, closed: this.closed, screenwidth: this.screenwidth });
  }

  toggleByWidth(): void {
    if (this.screenwidth < 700) {
      return this.toggleOpen()
    }
    else {
      return this.toggleCollapse();
    }
  }
}