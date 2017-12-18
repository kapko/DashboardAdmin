import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostListComponent } from 'app/posts/posts-list/posts-list.component';
import { PostsRoutingModule } from 'app/posts/post.router';
import { PostCreateComponent } from 'app/posts/create/post-create.component';
// plugins
import { ImageUploadModule } from 'angular2-image-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PostsRoutingModule,
    ImageUploadModule.forRoot(),
  ],
  providers: [
    // PostService
  ],
  declarations: [
    PostListComponent,
    PostCreateComponent,
  ]
})
export class PostsModule { }
