import { Component } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { PostService } from 'app/posts/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: 'post-create.html'
})

export class PostCreateComponent {
  // DEFAULT OPTIONS
  defaultData = {
    accountType: 'owner',
    sellingType: 'sell',
    forSell: 'room',
    currency: 'dollar',
    typeOfRoom: 'elite',
  };

  constructor(
    private postService: PostService,
  ) {}

  onUploadFinished(event: any): void {
    this.postService.uploadPicture(event.file.name, event.src)
      .then(res => {
        console.log('picture', res.downloadURL);
      });
  }

  onRemoved(event: any): void {
    this.postService.deletePicture(event.file.name);
  }

  submitForm(data: Post): void {
    // console.log(data);

    // this.postService.createPost(data);
  }

}
