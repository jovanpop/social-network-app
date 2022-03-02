import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[]=[];
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }
  getPosts(){
    this.httpClient.get<any>("http://localhost:4000/posts").subscribe(
      response => {
        this.posts= response;
      }
    )
  }
}
