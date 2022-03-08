import { Controller,Post,Body, Get,Param, Patch, Delete } from "@nestjs/common";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
    constructor (private readonly postsService: PostsService){}
    @Post()
    async addPost(@Body('text') postText: string){
        const user = "6226a233ec488d8af4671302";
        const generatedId = await this.postsService.insertPost(postText,user);
        return {id: generatedId};
    }
    @Get()
    async allPosts (){
        const AllPosts= await this.postsService.getPosts();
        return AllPosts;
    }
    @Patch(":id")
    async patchPost(@Body('text') text: string, @Param("id") id: string){
        await this.postsService.updatePost(text,id);
        return  "Post updated" as string ;
    }
    @Delete(":id")
    async deletePost(@Param("id") id:string){
        await this.postsService.deletePost(id);
        return "Post deleted" as string;
    }
}