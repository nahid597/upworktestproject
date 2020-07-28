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

  constructor(private postService: PostdataService) { }

  ngOnInit() {
    this.postService.getpost()
    this.postService.getPostsUpdateListener()
    .subscribe((post: Post[]) => {
      this.posts = post;
    });
    
  }

  
  

}
