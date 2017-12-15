import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostListComponent } from 'app/posts/posts-list/posts-list.component';
import { PostsRoutingModule } from 'app/posts/post.router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PostsRoutingModule,
  ],
  providers: [
    // PostService
  ],
  declarations: [
    PostListComponent,
  ]
})
export class PostsModule { }
