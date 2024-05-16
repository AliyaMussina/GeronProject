import { IsAlpha, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    firstName:string;
    
    @IsNotEmpty()
    lastName:string;
    
    @IsEmail()
    email:string;

    @IsAlpha()
    username:string

    @IsNotEmpty()
    password:string;
}
