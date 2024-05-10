import { IsAlphanumeric, IsNotEmpty } from "class-validator"

export class SignInDto {
    // @IsAlpha() только буквы , @IsAlphanumeric() только буквы и цифры
    @IsAlphanumeric()
    username:string
    // не пустое
    @IsNotEmpty()
    password:string
}
