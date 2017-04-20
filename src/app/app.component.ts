import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Post } from './post';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PostService]
})

export class AppComponent implements OnInit {
  title = 'CIPP2017 - The 2017 CoE-ICT PSU Phuket Senior Project';
  posts: Post[];
  errorMessage: string;

  constructor (private postService: PostService) { }

  getPosts() {
    this.postService.getPosts()
      .subscribe(
        posts => this.posts = posts,
        error => this.errorMessage = <any>error
      );
  }

  ngOnInit() {
    this.getPosts();
  }
}
