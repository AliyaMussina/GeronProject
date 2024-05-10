import { ApiProperty } from "@nestjs/swagger";
import { RolesProject } from "../entities/role.entity";
import { User } from "src/users/entities/user.entity";

export class GetMembersResponse{
    // авторизованные пользователи с ролями в проекте 
    @ApiProperty({example: RolesProject.worker})
    role:RolesProject

    @ApiProperty({
        example:{
            username:"еуыетшсл",
            firstName:"Герон",
            lastName:"Геронов"
        }
    })
    user: Pick<User, 'username' | "firstName" | "lastName">
}