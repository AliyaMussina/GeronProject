import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/authentication.guard';

@ApiTags('Профиль')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Get()
  getProfile(@Request() req:AuthRequest){
    return this.profileService.getProfile(req.user)
  }
}
