import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  showSidebar: boolean = false;

  subscription: Subscription;

  constructor(
    public location: Location,
    private af: AngularFireAuth,
    private router: Router,
  ) {
    this.subscription = this.router.events.subscribe((event: any) => {
      if (event.constructor.name === 'NavigationStart' && event.url !== '/login') {
        if (!localStorage.getItem('uid')) {
          this.router.navigate(['/login']);
          return;
        }
        this.showSidebar = true;
        this.subscription && this.subscription.unsubscribe();
      }
    });
  }

  // isMap(path) {
  //   var titlee = this.location.prepareExternalUrl(this.location.path());
  //   titlee = titlee.slice( 1 );
  //   if(path == titlee){
  //     return false;
  //   }
  //   else {
  //     return true;
  //   }
  // }
}
