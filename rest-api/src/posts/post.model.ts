import * as moongose from "mongoose";

export const PostSchema = new moongose.Schema ({
    text: {
        type: String,
        required: true
    },
    user: {
        type: moongose.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true});

export interface Post{
    id:string;
    text:string;
    user: string;
}