import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts-list/posts-list.component';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
    data: {
      title: 'Posts List'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}
