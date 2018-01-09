import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'admin/posts', title: 'Posts List',  icon:'pe-7s-note2', class: '' },
    // { path: 'admin/instagram', title: 'Instagram Posts',  icon:'pe-7s-ball', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
      private af: AngularFireAuth,
      private router: Router
  ) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logout(): void {
    this.af.auth.signOut();
    localStorage.removeItem('uid');
    window.location.reload();
  }
}
