import { Component } from '@angular/core';
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
  posts: Post;
  tableHeader: string[] = [
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
    'Фото',
    'Описание',
    'Цена, валюта',
    'Ном. тел.',
    'Доп. тел.',
    'Воцап',
  ];

  constructor(
    private postService: PostService,
  ) {
    this.postService.getListPosts()
      .subscribe(posts => {
        console.log(posts);
        this.posts = posts;
      });
  }

}
