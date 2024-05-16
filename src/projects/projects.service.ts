import { AddedUserToProjectDTO } from './dto/added-user-to-project.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Role, RolesProject } from './entities/role.entity';
import { GetParticipantsResponse } from './response/get-participants-response';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly rolesProjectRepository: Repository<Role>
  ) { }
//формируем пользователя
  async create(tokenData: TokenData, createProjectDto: CreateProjectDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: tokenData.id
      }
    })
    //формируем проект 
    const project = new Project(createProjectDto)

    await this.projectRepository.save(project)
    //формируем новую роль 
    await this.rolesProjectRepository.save({
      user,
      project,
      role: RolesProject.admin
    })
    return JSON.stringify("Проект создан")
  }

  async findAll(tokenData: TokenData) {
    return this.projectRepository.find({
      where: {
        roles: {
          user: {
            id: tokenData.id
          }
        }
      }
    })
  }
  // отображает всех участников проектов кто не находятся в проекте 
  async findParticipants(projectId: string) {
    const users = await this.userRepository.find({
      relations: {
        roles: {
          project: true,
        },
      },
    });
    const participnts: GetParticipantsResponse[] = [];

    for (const user of users) {
      const projectIds = user.roles.map((item) => item.project.id);
      if (projectIds.includes(projectId)) continue;

      participnts.push({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
    return participnts


  }
  //отображает всех участников проектов кто находятся в проекте 
  async findMembers(projectId: string) {
    return this.rolesProjectRepository.find({
      where: {
        project: {
          id: projectId
        }
      },
      relations: {
        user: true
      },
      select: {
        role: true,
        user: {
          username: true,
          firstName: true,
          lastName: true,
        }
      }
    })
  }

  async AddedUserToProject(
    projectId: string,
    tokenData: TokenData,
    dto: AddedUserToProjectDTO, 
  ){
    const user = await this.rolesProjectRepository.findOne({
      where:{
        user:{
          id: tokenData.id,
        },
        project:{
          id:projectId
        },
      },
    });
    if (user.role !== RolesProject.admin) {
      throw new HttpException(
        'У вас недостаточно прав, чтоб добавить пользователей в проект',
        HttpStatus.CONFLICT,
        
      );
    }

    const member = await this.userRepository.findOne({
      where:{
        username: dto.username,
      },
  });
  const project = await this.projectRepository.findOne({
    where:{
      id: projectId,
    },
  });
  await this.rolesProjectRepository.save({
    role:dto.role || RolesProject.worker,
    user:member,
    project: project,
  });
  return `Пользователь ${dto.username} добавлен`;
}
  //метод для обновления данных проекта
  //сохраняем новое название если оно есть 
  //находим пользователя и создаем ему связь с этим проектом с ролью worker
  async update(projectId:string, updateProjectDto:UpdateProjectDto){
    if (UpdateProjectDto.name){
      await this.projectRepository.save({
        id:projectId,
        name:updateProjectDto.name,
      });
    }
    for (const userName of updateProjectDto.users){
      const user=await this.userRepository.findOne({
        where:{
          username:userName,
        },
      });
      // проверка если пользователь уже существует, если пользоваль уже связан с этим проектом то удаляем 
      const checkUserCreated = await this.rolesProjectRepository.findOne({
        where:{
          user:{
            id:user.id,
          },
          project:{
            id:projectId,
          },
        },
      });
      if (checkUserCreated) continue;
      
      await this.rolesProjectRepository.save({
        user:{id:user.id},
        project:{id:projectId},
        role:RolesProject.worker,
      });
    }
    return JSON.stringify('Проект обновлен')
  }
}