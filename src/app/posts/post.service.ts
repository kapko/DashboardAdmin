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

  // delete with fileName path, return Promise
  deletePicture(fileName: string): any {
    return firebase.storage().ref().child(this.storageImagePath + fileName).delete();
  }

}
