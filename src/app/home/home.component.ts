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
  copyPost: Post[] = [];
  checkSearchOption: boolean;

  constructor(private postService: PostdataService) { }

  deleteItem(id: string)
  {
     this.postService.delteData(id);
  } 

  filter(query: string)
  {
      this.filterPost = (query) ?
      this.copyPost.filter((data)=> data.EmailName.toLowerCase().includes(query.toLowerCase())):
      this.copyPost;
  }

  filterSelect(selectData: string)
  {
     if(selectData == "All")
     {
       this.filterPost=this.posts;
       this.copyPost = this.filterPost;
     }
     else
     {
        this.filterPost = (selectData) ?
        this.posts.filter((data) => data.RoleName.toLowerCase().includes(selectData.toLowerCase())):
        this.posts;
        this.copyPost = this.filterPost;
     }

     
  }

  ngOnInit() {
    this.postService.getpost()
    this.postService.getPostsUpdateListener()
    .subscribe((post: Post[]) => {
      this.filterPost = this.posts = post;
    });
  }

  
  

}
