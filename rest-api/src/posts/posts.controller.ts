import { Controller,Post,Body, Get,Param, Patch, Delete } from "@nestjs/common";
import { PostsService } from "./posts.service";

@Controller("profile")
export class PostsController {
    constructor (private readonly postsService: PostsService){}
    @Post()
    async addPost(@Body('text') postText: string){
        const generetedId = await this.postsService.insertPost(postText);
        return {id: generetedId};
    }
    @Get()
    async allPosts (){
        const AllPosts= await this.postsService.getPosts();
        return AllPosts;
    }
    @Patch(":id")
    async patchPost(@Body('text') text: string, @Param("id") id: string){
        await this.postsService.updatePost(text,id)
        return ("Post updated");
    }
    @Delete(":id")
    async deletePost(@Param("id") id:string){
        await this.postsService.deletePost(id)
        return("Post deleted")
    }
}