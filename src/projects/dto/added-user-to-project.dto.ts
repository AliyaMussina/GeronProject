import { IsAlpha, IsOptional } from "class-validator";

export class AddedUserToProjectDTO{
    //какие данные нужны для добавления в проект пользователя. просто тип
    @IsAlpha ()
    username:string;

    @IsOptional ()
    role?:string;
}