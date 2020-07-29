import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostdataService } from 'src/app/postdata.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  post: Post;
  private mode = 'create';
  private postId: string;

  constructor(private postService: PostdataService, private router: Router, private route: ActivatedRoute) { }

  cancel(){
    this.router.navigate(['/'])
  }

  submit(f:NgForm){
    console.log(f.value.contact);
    const postData = f.value.contact
    this.postService.updateData(this.postId, postData);

    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((parmMap:ParamMap) => {
      if(parmMap.has('postId'))
      {
          this.mode = 'edit';
          this.postId = parmMap.get('postId');
          this.postService.getSingleData(this.postId)
           .subscribe(postData => {
              this.post = {_id:postData._id, FirstName: postData.FirstName,LastName: postData.LastName, EmailName: postData.EmailName, RoleName: postData.RoleName}
           });
      }
      else
      {
        this.mode = 'create';
        this.postId = null;
      }
    })
  }

}
