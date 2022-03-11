import { Controller, Post, Body, NotFoundException} from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }
    @Post('register')
    async addUser(
        @Body('first_name') first_name: string,
        @Body('last_name') last_name: string,
        @Body('email') email: string,
        @Body('picture') picture: string,
        @Body('username') username: string,
        @Body('password') password: string
    ) {
        const user = await this.userService.createUser(first_name, last_name, email, picture, username, password);
        return user as string;
    }
    @Post("login")
    async Login(@Body() login: UserDto) {
        const user = await this.userService.loginUser(login.username);
        if (user.length>0){
            const User = {
                id: user[0]._id,
                first_name: user[0].first_name,
                last_name: user[0].last_name,
                picture: user[0].picture
            } 
            return User;
        }else{
            throw new NotFoundException ("Invalid credentials");
        }
    }
}