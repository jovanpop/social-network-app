import { IsNotEmpty } from "class-validator";

export class UserDto{
    @IsNotEmpty({message: "Username field should not be empty !"})
    username:string
}