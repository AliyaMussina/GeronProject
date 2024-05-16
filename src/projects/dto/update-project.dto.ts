import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {
    @IsOptional() 
    @IsArray()
    @IsString({each:true})
    @ArrayMinSize(0)
    users: string [];

    @IsOptional()
    @IsString()
    name?: string;
}
