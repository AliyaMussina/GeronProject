import { IsAlphanumeric, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    firstName:string;
    
    @IsNotEmpty()
    lastName:string;
    
    @IsEmail()
    email:string;

    @IsAlphanumeric()
    username:string

    @IsNotEmpty()
    password:string;
}
