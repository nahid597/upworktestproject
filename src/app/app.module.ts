import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule} from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostdataService } from './postdata.service';
import { EditPostComponent } from './posts/edit-post/edit-post.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    HomeComponent,
    NavbarComponent,
    EditPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'', component: HomeComponent},
      {path: 'addnewitem', component:CreatePostComponent},
      {path: 'edit/:postId', component: EditPostComponent}
    ]),

    
  ],
  providers: [
    PostdataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
