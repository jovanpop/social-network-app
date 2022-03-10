import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  collapsed = true;
  avatar: any;
  user: any;
  userId: any;
  userFullName: any;

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }
  getPosts() {
    this.httpClient.get<any>(`http://localhost:4000/posts/${this.userId}`).subscribe(
      res => {
        this.posts = res;
        this.posts.forEach(post => {
          post.createdAt = new Date(post.createdAt).toDateString() + " at " + new Date(post.createdAt).getHours() + ":" + new Date(post.createdAt).getMinutes();
        })
      }
    )
  }
  userValidation(username: any) {
    this.httpClient.post("http://localhost:4000/users/login", username).subscribe(
      res => {
        this.user = res
        if(this.user.length > 0){
        this.userFullName = `${this.user[0].first_name} ${this.user[0].last_name}`;
        this.userId = this.user[0]._id;
        this.avatar = this.user[0].picture;
        this.getPosts();
        }
      }
    )
  }
  create(post: any, user=this.userId) {
    this.httpClient.post("http://localhost:4000/posts",{...post,user}).subscribe(
      res => {
        this.getPosts();
      }
    )
  }
  delete(id: any) {
    this.httpClient.delete(`http://localhost:4000/posts/${id}`, { responseType: 'text' }).subscribe(
      res => {
        this.getPosts();
      }
    )
  }
  update(post: any) {
    this.httpClient.patch(`http://localhost:4000/posts/${post.id}`, post.text, { responseType: "text" }).subscribe(
      res => {
        this.getPosts();
      }
    )
  }
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
}
