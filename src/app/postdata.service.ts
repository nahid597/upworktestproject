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
     this.http.get<{post:Post[]}>('api/posts')
     .subscribe((data) => {
       console.log(data);
       this.posts = data.post;
       this.postUpdated.next([...this.posts]);
      // return this.posts;
     });
     
  }

  getSingleData(id: string)
  {
    return this.http.get<{_id:string, FirstName: string, LastName: string, EmailName: string, RoleName: string}>('api/posts/' +id);
  }

  postData(post: Post[])
  {
      console.log(post);
      this.http.post<{message: string, post: Post[]}>('api/posts', post)
      .subscribe((data) => {
        console.log(data.message);
      });
  }

  updateData(id: string, post: Post)
  {
     console.log(id);
     const postData = {
        FirstName: post.FirstName,
        LastName: post.LastName,
        EmailName: post.EmailName,
        RoleName: post.RoleName
     }
     
     this.http.put<{message: string, post: Post[]}>('api/posts/' +id, post)
      .subscribe((data) => {
        const updatePost = [...this.posts];
        const oldPostId = updatePost.findIndex(p => p._id === post._id);
        updatePost[oldPostId] = post;
        this.postUpdated.next([...this.posts]);
      });
  }

  delteData(id: string)
  {
     console.log(id);
    this.http.delete('api/posts/' +id ,{ responseType: 'text'})
    .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post._id !== id);
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
    })
  }

  getPostsUpdateListener()
  {
     return this.postUpdated.asObservable();
  }
}
