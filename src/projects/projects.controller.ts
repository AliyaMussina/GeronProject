import { Controller, Get, Post, Body, Patch, Param, Delete, Request} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetProjectFindAllResponse } from './response/get-project-find-all.response';

@ApiTags('Projects')
@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(
    //будет хранится пользователь с токеном
    @Request() req:AuthRequest,
    @Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(req.user, createProjectDto);
  }
@ApiOkResponse({type: GetProjectFindAllResponse})
  @Get()
  findAll(@Request() req:AuthRequest) {
    return this.projectsService.findAll(req.user);
  }

}
