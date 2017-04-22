import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Post } from './post';

@Injectable()
export class PostService {
  private postsURL = 'http://coepkt.org:8000/posts';

  constructor(private http: Http) { }

  getPosts(): Observable<Post[]> {
    return this.http.get(this.postsURL)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const posts = res.json();
    let rank: number;
    let lastScore: number;
    const getProjectName = new RegExp('โครงงาน: (.*)\ #.*\n');
    const getAuthors = new RegExp('(.*)\n');

    posts.sort((a, b) => b.score - a.score);

    rank = 1;
    lastScore = posts[0].score + 1;

    for (const post of posts) {
      post.authors = getAuthors.exec(post.message)[1];
      post.project_name = getProjectName.exec(post.message)[1];

      post.rank = rank;

      if (post.score < lastScore)
      {
        lastScore = post.score;
        rank++;
      }
    }

    return posts.sort((a, b) => b.score - a.score) || { };
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
