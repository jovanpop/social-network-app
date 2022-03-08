import * as moongose from "mongoose";

export const UserSchema = new moongose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    picture:{
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export interface User{
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    picture: string;
    username: string;
    password: string;
}