import { AddedUserToProjectDTO } from './dto/added-user-to-project.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Request} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetProjectFindAllResponse } from './response/get-project-find-all.response';
import { GetParticipantsResponse } from './response/get-participants-response';
import { GetMembersResponse } from './response/get-members-response';
import { UpdateProjectDto } from './dto/update-project.dto';

@ApiTags('Projects')
@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(
    @Request() req:AuthRequest,
    @Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(req.user,createProjectDto);
  }
  @ApiOkResponse({type:GetProjectFindAllResponse})
  @Get()
  findAll(@Request() req:AuthRequest) {
    return this.projectsService.findAll(req.user);
  }
  @ApiOkResponse({type: GetMembersResponse})
  @Get(':id/participants')
  findParticipants(@Param('id') id:string){
    return this.projectsService.findParticipants(id)
  }
  // 
  @ApiOkResponse({type: GetParticipantsResponse})
  @Get(':id/members')
  findMembers(@Param('id') id:string){
    return this.projectsService.findMembers(id)
  }

  //
  @Post(':id/members')
  AddedUserToProject(
    @Param('id') id:string,
    @Request() req:AuthRequest,
    @Body() dto: AddedUserToProjectDTO, 
  ){
    return this.projectsService.AddedUserToProject(id, req.user, dto);
  }
  //
  @Patch(':id')
  update(@Param('id') id:string, @Body() updateProjectDto:UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto)
  }
}
