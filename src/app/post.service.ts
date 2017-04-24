import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Post } from './post';

@Injectable()
export class PostService {
  private postsURL = 'https://api.coepkt.org/posts';
  private filterType = 'All';

  constructor(private http: Http) { }

  setFilter(mode: string) { this.filterType = mode; }
  getFilter(): string { return this.filterType; }

  getPosts(): Observable<Post[]> {
    return this.http.get(this.postsURL)
      .map(this.extractData, this)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let posts = res.json();
    let rank: number;
    let lastScore: number;
    const getProjectName = new RegExp('โครงงาน: (.*)\ #.*\n');
    const getAuthors = new RegExp('(.*)\n');
    const isCoE = new RegExp('.*35512.*'); // CoE Phuket student code xx35512xxx

    // Filter posts
    posts = posts.filter((post, idx, obj) => {
      if (this.filterType === 'CoE') {
        return isCoE.test(post.message);
      } else if (this.filterType === 'ICT') {
        return !isCoE.test(post.message);
      } else {
        return true;
      }
    });

    // Sort by score
    posts.sort((a, b) => b.score - a.score);

    rank = 1;
    lastScore = posts[0].score + 1;

    for (const post of posts) {
      // extract post details
      post.authors = getAuthors.exec(post.message)[1];
      post.project_name = getProjectName.exec(post.message)[1];

      // compute post rank
      post.rank = rank;

      if (post.score < lastScore) {
        lastScore = post.score;
        rank++;
      }
    }

    return posts || { };
  }

  private handleError(error: Response | any) {
    let errorMessage: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errorMessage = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errorMessage = error.message ? error.message : error.toString();
    }

    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }
}
