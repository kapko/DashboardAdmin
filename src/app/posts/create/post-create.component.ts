import { Component } from '@angular/core';

export interface Post {
  title: string;
  description: string;
  accountType: 'owner' | 'agent';
  sellingType: 'rent' | 'sell' | 'buy';
  forSell?: 'room' | 'area' | 'house' | 'camp' | 'office' | 'business' | 'other';
  typeOfRoom?: 'elite' | '105' | '104' | '106' | 'old' | 'pso';
  address: string;
  flatCount: number;
  area: string;
  floor: string;
  fixes?: 'euro' | 'design' | 'none' | 'simple';
}

@Component({
  selector: 'app-post-create',
  templateUrl: 'post-create.html'
})

export class PostCreateComponent {
  data: Post;

  constructor() {
    console.log('created');
  }
}
