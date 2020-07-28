import { Component, OnInit } from '@angular/core';
import { PostdataService } from 'src/app/postdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private postservice: PostdataService, private router: Router) { }

  ngOnInit() {
  }




  submit(f)
  {
     const post = f.value.contact;
     console.log(post);
    this.postservice.postData(post);
    this.router.navigate(['/']);
  }

}
