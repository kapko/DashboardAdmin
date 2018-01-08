import { Component } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
// local
import { PostService } from '../post.service';
import { Post } from 'app/interfaces/post.interface';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-posts-list',
  templateUrl: 'posts-list.html',
})

export class PostListComponent {
  public carouselOne: NgxCarousel;

  p: number = 1;
  posts: Post;
  tableHeader: string[] = [
    'Фото',
    'Тип Аккаунта',
    'Тип Сделки',
    'Что продается',
    'Тип',
    'Количество комнат',
    'Площадь',
    'Площадь участка',
    'Этажность',
    'Ремонт (состояние)',
    'Адресс',
    'Описание',
    'Цена, валюта',
    'Ном. тел.',
    'Доп. тел.',
    'Воцап',
    'Опции',
  ];

  constructor(
    private postService: PostService,
  ) {
    this.postService.getListPosts()
      .subscribe(posts => this.posts = posts);
  }

  ngOnInit() {
    this.carouselOne = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 400,
      interval: 4000,
      point: { visible: true },
      load: 2,
      touch: true,
      loop: true,
      custom: 'banner'
    };
  }
}
