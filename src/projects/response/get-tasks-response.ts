import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { Project } from "../entities/project.entity";
import { TaskStatus } from "../entities/task.entity";

export class GetTaskResponse {
    @ApiProperty({example:'Сделать дизайн'})
    title: string;

    @ApiProperty({example:'2024-05-20T00:00:00+06:00'})
    startDate:string;

    @ApiProperty({example:'2024-05-20T00:00:00+06:00'})
    endDate:string;

    @ApiProperty({
        example:{
            username:'testnick',
            firstName:'Герон',
            lastName:'Геронов',
        },
    })
    user:Pick<User, 'username' | 'firstName' | 'lastName'>

    @ApiProperty({
        example:{
            id: '5554-56565-56655-665656',
            name:'Название проекта',
        },
    })
    project:Project;

    @ApiProperty({enum: TaskStatus})
    status:TaskStatus;

}