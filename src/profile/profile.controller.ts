import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/authentication.guard';
import { GetMyProfileResponse } from './response/get-my-profile-response';

@ApiTags('Профиль')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOkResponse({type: GetMyProfileResponse})//
  @Get()
  getProfile(@Request() req:AuthRequest){
    return this.profileService.getProfile(req.user)
  }
}
