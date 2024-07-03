import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiResponse({ type: User })
  async loginUser(@Body() loginData: LoginDto) {
    const {userName, userId} = loginData
    const existingUser = await this.userService.find(userId);
    if (existingUser) {
      return existingUser;
    }
    const newUser = await this.userService.create(userName, userId);
    return newUser;
  }
}
