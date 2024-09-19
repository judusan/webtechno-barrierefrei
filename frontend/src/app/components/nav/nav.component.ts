import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  public skipLinkHref: string = '#main-content';

  constructor(private router: Router, private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateSkipLink();
      this.scrollToTop(); 
      this.closeNavbar();
    });
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private updateSkipLink(): void {
    const url = this.router.url;
    switch (url) {
      case '/login':
        this.skipLinkHref = '/login#login-main';
        break;
      case '/register':
        this.skipLinkHref = '/register#register-main';
        break;
      case '/table':
        this.skipLinkHref = '/table#table-main';
        break;
      default:
        this.skipLinkHref = '#main-content';
        break;
    }
  }

  private closeNavbar(): void {
    const navbarCollapse = this.elementRef.nativeElement.querySelector('#navbarNavAltMarkup');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      this.renderer.removeClass(navbarCollapse, 'show');
    }
  }

  focusFirstInput(event: Event): void {
    event.preventDefault();
    setTimeout(() => {
      const firstInput = document.querySelector('input');
      if (firstInput) {
        (firstInput as HTMLElement).focus();
      }
      else if (this.router.url === '/table') {
        this.focusFirstTableElement();
      } 
      else if (this.router.url === '/') {
        this.focusFirstFactBox();
      }
    });
  }

  private focusFirstTableElement(): void {
    const firstTableElement = document.getElementById('add-item-section');
    if (firstTableElement) {
      (firstTableElement as HTMLElement).focus();
    }
    else {
      console.log('No table element found to focus.');
    }
  }

  private focusFirstFactBox(): void {
    const firstFactBox = document.querySelector('.fact-box');
    if (firstFactBox) {
      (firstFactBox as HTMLElement).focus();
    } else {
      console.log('No fact box found to focus.');
    }
  }
}