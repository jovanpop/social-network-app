import { IsNotEmpty, NotContains } from "class-validator";

export class PostDto{
    @IsNotEmpty({message: "Post should have some text !"})
    @NotContains("bannedword1",{message: "Post should not contain offensive words !"})
    @NotContains("bannedword2",{message: "Post should not contain offensive words !"})
    @NotContains("bannedword3",{message: "Post should not contain offensive words !"})
    text: string
    user: string
}