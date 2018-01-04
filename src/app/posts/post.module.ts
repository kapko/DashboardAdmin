import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { PostListComponent } from 'app/posts/posts-list/posts-list.component';
import { PostsRoutingModule } from 'app/posts/post.router';
import { PostCreateComponent } from 'app/posts/create/post-create.component';

// services
import { PostService } from 'app/posts/post.service';
import { TextMaskModule } from 'angular2-text-mask';
import { GooglePlaceModule } from 'angular2-google-place';
import { googlApiKey } from 'app/configs/db';
// plugins
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';
import { ImageUploadModule } from 'angular2-image-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    PostsRoutingModule,
    ImageUploadModule.forRoot(),
    NgxCarouselModule,
    AgmCoreModule.forRoot({
      apiKey: googlApiKey,
      libraries: ['places']
    }),
    TextMaskModule,
  ],
  providers: [
    PostService,
  ],
  declarations: [
    PostListComponent,
    PostCreateComponent,
  ]
})
export class PostsModule { }
