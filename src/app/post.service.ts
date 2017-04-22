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
    let body = res.json();

    var getProjectName = new RegExp('โครงงาน: (.*)\ #.*\n');
    var getAuthors = new RegExp('(.*)\n');

    for (let post of body) {
      post.authors = getAuthors.exec(post.message)[1];
      post.project_name = getProjectName.exec(post.message)[1];
    }

    return body.sort((a, b) => b.score - a.score) || { };
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
