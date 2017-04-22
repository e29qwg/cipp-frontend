import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Post } from './post';
import { PostService } from './post.service';
import { Observable } from 'rxjs/Observable';
import { AnonymousSubscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PostService]
})

export class AppComponent implements OnInit {
  private postsSubscription: AnonymousSubscription;
  private timerSubscription: AnonymousSubscription;

  title = 'CIPP2017 - The 2017 CoE-ICT PSU Phuket Senior Project';
  posts: Post[];
  errorMessage: string;

  constructor (private postService: PostService) { }

  private reloadPosts(): void {
    this.postsSubscription = this.postService.getPosts()
      .subscribe(
        posts => { this.posts = posts; this.subscribeToData() },
        error => this.errorMessage = <any>error
      );
  }

  private subscribeToData(): void {
    this.timerSubscription = Observable.timer(5000).first().subscribe(
      () => this.reloadPosts()
    );
  }

  ngOnInit() {
    this.reloadPosts();
  }
}
