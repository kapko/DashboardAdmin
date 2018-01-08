import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import { Post } from '../interfaces/post.interface';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { promise } from 'selenium-webdriver';
import { Http, Response } from '@angular/http';

@Injectable()
export class InstagramService {
  // post path
  postPath = '/all-posts/';

  storageImagePath = '/image/posts/';

  baseUrl = 'https://api.instagram.com/v1/users/6681274827/media/recent/?access_token=6681274827.6860ec1.20629fa0af584fed84c30c7ba1bfe0ec';

  constructor(
      private db: AngularFireDatabase,
      private firebaseApp: FirebaseApp,
      private http: Http,
    ) {
    }

  getPosts(count: number = 20, max_id: string = null): any {
    console.log(`${this.baseUrl}`);
    return this.http.get(`${this.baseUrl}`).map((data: Response) => data.json());
  }

}
