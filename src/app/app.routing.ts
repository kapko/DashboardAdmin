import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { AppComponent } from './app.component';
import { SignUpComponent } from 'app/signup/signup.component';

const routes: Routes = [
  {
    path: 'admin',
    component: UserComponent,
    children: [
      {
        path: 'posts',
        loadChildren: './posts/post.module#PostsModule'
      },
      {
        path: 'instagram',
        loadChildren: './instagram/instagram.module#InstagramModule'
      }
    ]
  },
  {
    path: 'login',
    component: SignUpComponent,
  },
  { path: 'dashboard', component: HomeComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
