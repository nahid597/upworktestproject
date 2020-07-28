import { Component, OnInit } from '@angular/core';
import { PostdataService } from 'src/app/postdata.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private postservice: PostdataService) { }

  ngOnInit() {
  }

  log(x)
  {
    console.log(x);
  }

  log2(x)
  {
    console.log(x);
  }

  submit(f)
  {
     const post = f.value.contact;
     console.log(post);
    this.postservice.postData(post);
  }

}
