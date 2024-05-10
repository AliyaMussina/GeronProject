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
  rolesprojectRepository: any;
  rolesProjectRepository: any;

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>
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
    await this.rolesRepository.save({
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
  // отображает всех участников проектов кот находятся в проекте 
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
  //отображает всех участников проектов кот не находятся в проекте 
  async findMembers(projectId: string) {
    return this.rolesRepository.find({
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
    const user = await this.rolesRepository.findOne({
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
  return 'Пользователь ${dto.username} добавлен';
}
}
