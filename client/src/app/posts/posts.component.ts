import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[]=[];
  collapsed = true;
  
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
        this.posts= res;
      }
    )
  }
  submit(post:any){
    this.httpClient.post("http://localhost:4000/posts",post).subscribe(
      res=>{
        console.log(res);
        window.location.reload();
      }
    )
  }
  openVerticallyCentered(content:any) {
    this.modalService.open(content, { centered: true });
  }
}
