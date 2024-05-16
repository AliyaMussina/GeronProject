import { IsAlpha, IsOptional } from "class-validator";
import { RolesProject } from "../entities/role.entity";

export class AddedUserToProjectDTO{
    //какие данные нужны для добавления в проект пользователя. просто тип
    @IsAlpha ()
    username:string;

    @IsOptional ()
    role?:RolesProject;
}