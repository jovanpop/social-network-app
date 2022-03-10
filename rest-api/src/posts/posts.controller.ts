import { Controller,Post,Body, Get,Param, Patch, Delete } from "@nestjs/common";
import { PostDto } from "./dto/post.dto";
import { PostsService } from "./posts.service";
let Filter = require("bad-words");

@Controller("posts")
export class PostsController {
    constructor (private readonly postsService: PostsService){}
    filter = new Filter({placeHolder:"*"});
    @Post()
    async addPost(@Body() text: PostDto){
        const filteredText = this.filter.clean(text.text);
        const generatedId = await this.postsService.insertPost({text: filteredText, user: text.user});
        return {id: generatedId};
    }
    @Get(":id")
    async allPosts (@Param("id") id:string){
        const AllPosts= await this.postsService.getPosts(id);
        return AllPosts;
    }
    @Patch(":id")
    async patchPost(@Body() updatedText: PostDto, @Param("id") id: string){
        const filteredText = this.filter.clean(updatedText.text);
        await this.postsService.updatePost(filteredText,id);
        return  "Post updated" as string ;
    }
    @Delete(":id")
    async deletePost(@Param("id") id:string){
        await this.postsService.deletePost(id);
        return "Post deleted" as string;
    }
}