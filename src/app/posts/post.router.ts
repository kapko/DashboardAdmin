import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts-list/posts-list.component';
import { PostCreateComponent } from './create/post-create.component';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
    data: {
      title: 'Posts List'
    }
  },
  {
    path: 'create',
    component: PostCreateComponent,
    data: {
      title: 'Post Create'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}
