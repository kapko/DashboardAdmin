import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Promise } from 'firebase/app';
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

  createPost(postData: Post): Promise<any> {
    return this.db
      .list(this.postPath)
      .push(postData);
  }

  // upload picture fileName path, return Promise
  uploadPicture(fileName: string, file: string): Promise<any> {
    return firebase
      .storage()
      .ref()
      .child(this.storageImagePath + fileName)
      .putString(file, 'data_url');
  }

  // delete with fileName path, return Promise
  deletePicture(fileName: string): Promise<any> {
    return firebase.storage().ref().child(this.storageImagePath + fileName).delete();
  }

}
