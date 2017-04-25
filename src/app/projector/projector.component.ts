import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';
import { Post } from '../post';
import { PostService } from '../post.service';
import { Observable } from 'rxjs/Observable';
import { AnonymousSubscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-projector',
  templateUrl: './projector.component.html',
  styleUrls: ['./projector.component.css'],
  providers: [PostService]
})

export class ProjectorComponent implements OnInit {
  private postsSubscription: AnonymousSubscription;
  private timerSubscription: AnonymousSubscription;

  readonly normalInterval = 15000; // 15s
  readonly facebookInterval = 60000; // 60s

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
    this.showingPost = '';
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
    this.reloadInterval = (this.showingPost === '') ? this.normalInterval : this.facebookInterval;
    this.timerSubscription = Observable.timer(this.reloadInterval).first().subscribe(
      () => this.reloadPosts()
    );
  }

  resubscribe(): void {
    this.timerSubscription.unsubscribe();
    this.postsSubscription.unsubscribe();
    this.reloadPosts();
  }

  setFilter(filterType: string) {
    this.filterType = filterType;
    this.resubscribe();
  }

  showPost(postID: string) {
    if (this.showingPost === postID) {
      this.showingPost = '';
    } else {
      this.showingPost = postID;
    }

    this.resubscribe();

    return false;
  }

  ngOnInit() {
    this.reloadPosts();
  }
}
