import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
require('dotenv').config();

@Module({
  imports: [MongooseModule.forRoot(
    `mongodb+srv://jovanpop:${process.env.MONGO_PW}@cluster0.ndsw9.mongodb.net/social-network?retryWrites=true&w=majority`,
  ),UsersModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
