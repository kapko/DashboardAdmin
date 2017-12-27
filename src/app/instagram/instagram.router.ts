import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstagramListComponent } from './instagram-list/instagram-list.component';

const routes: Routes = [
  {
    path: '',
    component: InstagramListComponent,
    data: {
      title: 'Instagram Posts List'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstagramRoutingModule {}
