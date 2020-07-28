import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{Post} from './posts/post.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostdataService {

 private posts:Post[] =[];
 private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  getpost()
  {
     this.http.get<{post:Post[]}>('http://localhost:3000/api/posts')
     .subscribe((data) => {
       console.log(data);
       this.posts = data.post;
       this.postUpdated.next([...this.posts]);
      // return this.posts;
     });
     
  }

  postData(post: Post[])
  {
      console.log(post);
      this.http.post<{message: string, post: Post[]}>('http://localhost:3000/api/posts', post)
      .subscribe((data) => {
        console.log(data.message);
      });
  }

  getPostsUpdateListener()
  {
     return this.postUpdated.asObservable();
  }
}
