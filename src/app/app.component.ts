import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';
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

  title = 'The 2017 CoE-ICT PSU Phuket Senior Projects';
  shortTitle = 'CIPP2017';
  posts: Post[];
  errorMessage: string;
  showingPost: string;
  filterType: string;  // 3 modes: All, CoE, ICT
  reloadInterval: number;

  private initParams: InitParams = {
    xfbml: true,
    version: 'v2.9'
  };

  constructor (private postService: PostService, private fb: FacebookService) {
    this.reloadInterval = 10000;
    this.filterType = 'All';
  }

  private reloadPosts(): void {
    this.postService.setFilter(this.filterType);
    this.postsSubscription = this.postService.getPosts()
      .subscribe(
        posts => {
          this.posts = posts;
          this.fb.init(this.initParams);
          this.subscribeToData();
        },
        error => this.errorMessage = <any>error
      );
  }

  private subscribeToData(): void {
    this.reloadInterval = (this.showingPost == '') ? 10000: 60000;
    this.timerSubscription = Observable.timer(this.reloadInterval).first().subscribe(
      () => this.reloadPosts()
    );
  }

  setFilter(filterType: string) {
    this.filterType = filterType;
    this.timerSubscription.unsubscribe();
    this.postsSubscription.unsubscribe();
    this.reloadPosts();
  }

  showPost(postID: string) {
    if (this.showingPost == postID)
      this.showingPost = '';
    else
      this.showingPost = postID;

    this.timerSubscription.unsubscribe();
    this.postsSubscription.unsubscribe();
    this.reloadPosts();

    return false;
  }

  ngOnInit() {
    this.reloadPosts();
  }
}
