import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { InstagramListComponent } from 'app/instagram/instagram-list/instagram-list.component';
// plugins
import { ImageUploadModule } from 'angular2-image-upload';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
// services
import { InstagramService } from 'app/instagram/instagram.service';
import { InstagramRoutingModule } from './instagram.router';

const config = {
  apiKey: 'AIzaSyDlvb_n_HrLNv84m6WE8SdrMU9LP5-88uU',
  authDomain: 'service-aaecc.firebaseapp.com',
  databaseURL: 'https://service-aaecc.firebaseio.com',
  projectId: 'service-aaecc',
  storageBucket: 'service-aaecc.appspot.com',
  messagingSenderId: '541761055736'
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InstagramRoutingModule,
    ImageUploadModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(config),
  ],
  providers: [
    InstagramService,
  ],
  declarations: [
    InstagramListComponent,
  ]
})
export class InstagramModule { }
