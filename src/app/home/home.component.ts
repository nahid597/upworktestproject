import { PostdataService } from './../postdata.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../posts/post.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];
  filterPost: Post[] = [];

  constructor(private postService: PostdataService) { }

  deleteItem(id: string)
  {
     this.postService.delteData(id);
  } 

  filter(query: string)
  {
      this.filterPost = (query) ?
      this.posts.filter((l)=> l.LastName.toLowerCase().includes(query.toLowerCase()) || l.FirstName.toLowerCase().includes(query.toLowerCase())):
      this.posts;
  }

  ngOnInit() {
    this.postService.getpost()
    this.postService.getPostsUpdateListener()
    .subscribe((post: Post[]) => {
      this.filterPost = this.posts = post;
    });

  }

  
  

}
