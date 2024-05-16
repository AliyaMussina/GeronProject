import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { GetTaskResponse } from '../response/get-tasks-response';

@ApiTags("Tasks")
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService){}
    @Post()
    create(@Request() req:AuthRequest, @Body() createTaskDto: CreateTaskDto){
        return this.tasksService.create(req.user, createTaskDto)
    }
    @ApiOkResponse({type:GetTaskResponse})
    @Get()
    findAll(@Query() filters:GetTasksFilterDto){
        return this.tasksService.findAll(filters)
    }
    @Patch(':id')
    update(@Param('id') id:string, @Body() updateTaskdto: UpdateTaskDto){
        return this.tasksService.update(id, updateTaskdto)
    }

    @Delete(':id')
    remove(@Param('id') id:string){
        return this.tasksService.remove(id)
    }
    @ApiOkResponse({type:GetTaskResponse})
    @Get('/my')
    findMy(@Query() filters:GetTasksFilterDto,@Request() req:AuthRequest){
        return this.tasksService.findAll(filters, req.user);
    }
}
