import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[]=[];
  collapsed = true;
  avatar = "";
  user = "";
  username="";
  
  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }
  getPosts(){
    this.httpClient.get<any>("http://localhost:4000/posts").subscribe(
      res => {
        this.posts = res;
        this.posts.forEach(post=>{
          post.createdAt= new Date(post.createdAt).toDateString()+" at "+new Date(post.createdAt).getHours()+":"+new Date(post.createdAt).getMinutes();
        })
        this.avatar= this.posts[0].user.picture;
        this.user= `${this.posts[0].user.first_name} ${this.posts[0].user.last_name}`;
      }
    )
  }
  userValidation(username:any){
    this.username=username
  }
  create(post:any){
    this.httpClient.post("http://localhost:4000/posts",post).subscribe(
      res=>{
        console.log(res);
        this.getPosts();
      }
    )
  }
  delete(id:any){
    this.httpClient.delete(`http://localhost:4000/posts/${id}`,{responseType: 'text'}).subscribe(
      res=>{
        console.log(res);
        this.getPosts();
      }
    ) 
  }
  update(post:any){
    this.httpClient.patch(`http://localhost:4000/posts/${post.id}`, post.text,{responseType: "text"}).subscribe(
      res=>{
        console.log(res);
        this.getPosts();
      }
    )
  }
  openVerticallyCentered(content:any) {
    this.modalService.open(content, { centered: true });
  }
}
