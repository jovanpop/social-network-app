import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from './user.model';

@Injectable()
export class UsersService {
    constructor (@InjectModel('User') private readonly userModel: Model<User>){}
    async createUser (
        first_name: string,
        last_name: string,
        email: string,
        picture: string,
        username: string,
        password: string
        ){
            const newUser = new this.userModel({username,password,first_name,last_name,email,picture});
            const user = await newUser.save();
            return user.username as string;
        }
    async loginUser (username:string){
        const user = await this.userModel.find({username})
        return user;
    }
}
