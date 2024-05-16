import { IsAlpha, IsNotEmpty } from "class-validator"

export class SignInDto {
    @IsAlpha()
    username:string

    @IsNotEmpty()
    password:string
}
