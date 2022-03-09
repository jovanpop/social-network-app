import { Controller,Post,Body, Get,Param, Patch, Delete, UsePipes, ValidationPipe } from "@nestjs/common";
import { PostDto } from "./dto/post.dto";
import { PostsService } from "./posts.service";
let Filter = require("bad-words");

@Controller("posts")
export class PostsController {
    constructor (private readonly postsService: PostsService){}
    filter = new Filter({placeHolder:"*"});
    @Post()
    async addPost(@Body() postText: PostDto){
        const text = this.filter.clean(postText.text);
        const generatedId = await this.postsService.insertPost(text,postText.user);
        return {id: generatedId};
    }
    @Get()
    async allPosts (){
        const AllPosts= await this.postsService.getPosts();
        return AllPosts;
    }
    @Patch(":id")
    async patchPost(@Body() updatedText: PostDto, @Param("id") id: string){
        await this.postsService.updatePost(updatedText.text,id);
        return  "Post updated" as string ;
    }
    @Delete(":id")
    async deletePost(@Param("id") id:string){
        await this.postsService.deletePost(id);
        return "Post deleted" as string;
    }
}