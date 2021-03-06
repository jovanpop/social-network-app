import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model} from "mongoose";
import { Post } from "./post.model";

@Injectable()
export class PostsService {
    constructor(
        @InjectModel('Post') private readonly postModel: Model<Post>,
    ){}
    async insertPost (text: any){
        const newPost = new this.postModel(text);
        const post = await newPost.save();
        return post.id as string;
    }
    async getPosts(id){
        const AllPosts = await this.postModel.find({user: id}).populate("user","username");
        return AllPosts;
    }
    async updatePost(text:string, id: string){
        await this.postModel.findByIdAndUpdate(id, {text: text});
        return {message: "Post Updated"};
        }
    async deletePost(id:string){
        await this.postModel.findByIdAndDelete(id);
        return "Post Deleted" as string ;
    }
}

