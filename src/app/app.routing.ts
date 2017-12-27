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
  { path: 'dashboard', component: HomeComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

// const routes: Routes = [
//     { path: 'dashboard',      component: HomeComponent },
//     { path: 'user',           component: UserComponent },
//     { path: 'table',          component: TablesComponent },
//     { path: 'typography',     component: TypographyComponent },
//     { path: 'icons',          component: IconsComponent },
//     { path: 'maps',           component: MapsComponent },
//     { path: 'notifications',  component: NotificationsComponent },
//     {
//       path: 'upgrade',
//       component: UpgradeComponent,
//       children: [
//         {
//           path: 'posts',
//           loadChildren: './posts/post.module#PostsModule'
//         }
//       ]
//     },
//     { path: '', redirectTo: 'hjk', pathMatch: 'full' }
// ];

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
