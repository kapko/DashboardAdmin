import { Component } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { PostService } from 'app/posts/post.service';
import { Promise } from 'firebase/app';

export interface ImageStructure {
  fileName: string;
  file: string;
}

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

  images: ImageStructure[] = [];

  constructor(
    private postService: PostService,
  ) {}

  // upload files
  onUploadFinished(event: any): void {
    this.images.push({fileName: event.file.name, file: event.src});
  }

  // remove images from array
  onRemoved(event: any): void {
    this.images.forEach(item => {
      if (item.fileName === event.file.name) {
        this.images.splice(this.images.indexOf(item), 1);
      }
    });
  }

  // return promise of array
  uploadImages(): Array<any> {
    const urls = [];

    this.images.forEach(image => {
      urls.push(
        this.postService.uploadPicture(image.fileName, image.file).then(res => res.downloadURL)
      );
    });

    return urls;
  }

  submitForm(data: Post): void {
    Promise.all(this.uploadImages())
      .then(res => {
        data.created = + new Date();
        data.images = res;
        this.postService.createPost(data);
      });
  }
}
