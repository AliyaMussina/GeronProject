import { IsAlphanumeric, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    //@IsNotEmpty проверка чтоб не было пустое поле
    @IsNotEmpty()
    firstName:string;
    @IsNotEmpty()
    lastName:string;
    //@IsEmail() проверка email на то что там содержится @    
    @IsEmail()
    email:string;
    // @IsAlphanumeric() только буквы и цифры
    @IsAlphanumeric()
    username:string
    @IsNotEmpty()
    password:string;


}
