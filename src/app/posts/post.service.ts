import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Post } from '../interfaces/post.interface';
import * as firebase from 'firebase';
import { promise } from 'selenium-webdriver';

@Injectable()
export class PostService {
  // post path
  postPath = '/all-posts/';

  storageImagePath = '/image/posts/';

  constructor(
      private db: AngularFireDatabase,
    ) {
    }

  getListPosts(): FirebaseListObservable<any> {
    return this.db.list(this.postPath);
  }

  getPost(postId: string): any {
    return this.db.object(this.postPath + postId);
  }

  createPost(postData: Post): any {
    return this.db
      .list(this.postPath)
      .push(postData);
  }

  // upload picture fileName path, return Promise
  uploadPicture(fileName: string, file: string): any {
    return firebase
      .storage()
      .ref()
      .child(this.storageImagePath + fileName)
      .putString(file, 'data_url');
  }

  // thumbnailify(base64Image, targetSize, callback) {
  //     let img = new Image(),
  //       canvas = document.createElement('canvas'),
  //       ctx = canvas.getContext('2d');
  //     img.onload = function() {
  //       let width = img.width,
  //         height = img.height,
  //         canvas = document.createElement('canvas'),
  //         ctx = canvas.getContext('2d');
  //       canvas.width = canvas.height = targetSize;
  //       ctx.drawImage(
  //         img,
  //         width > height ? (width - height) / 2 : 0,
  //         height > width ? (height - width) / 2 : 0,
  //         width > height ? height : width,
  //         width > height ? height : width,
  //         0, 0,
  //         targetSize, targetSize
  //       );
  //       callback(canvas.toDataURL());
  //     };
  //     img.src = base64Image;
  //   };

  thumbnailify(base64Image, targetSize) {
    return new Promise((res, rej) => {
      let img = new Image(),
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
      img.onload = function() {
        let width = img.width,
          height = img.height,
          canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d');
        canvas.width = canvas.height = targetSize;
        ctx.drawImage(
          img,
          width > height ? (width - height) / 2 : 0,
          height > width ? (height - width) / 2 : 0,
          width > height ? height : width,
          width > height ? height : width,
          0, 0,
          targetSize, targetSize
        );
        res(canvas.toDataURL());
      };
      img.src = base64Image;
    });
  };

  // delete with fileName path, return Promise
  deletePicture(fileName: string): any {
    return firebase.storage().ref().child(this.storageImagePath + fileName).delete();
  }

}
