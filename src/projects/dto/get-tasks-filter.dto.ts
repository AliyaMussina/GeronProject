import { IsAlpha, IsOptional, IsString } from "class-validator";

export class GetTasksFilterDto{
    @IsOptional()
    @IsAlpha()
    username?:string;

    @IsOptional()
    @IsString()
    projectId?:string;
}