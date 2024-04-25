import { AbstractEntity } from "src/abstractions/abstract.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToOne } from "typeorm";
import { Project } from "./project.entity";


export enum RoLesProject{
    admin = 'ADMIN',
    worker = 'WORKER',
}

@Entity()
export class Role extends AbstractEntity<Role> {
    @Column()
    role:RoLesProject;
    
    @ManyToOne(()=> User, (user) => user.roles)
    user:User;

    @ManyToOne(()=> Project, (project) => project.roles)
    @JoinTable()
    project:Project;
}