import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './login.dto';
import { User } from './models/user.model';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiResponse({ type: User })
  async loginUser(@Body() loginData: LoginDto) {
    const existingUser = await this.userService.findUser(loginData.userId);
    if (existingUser) {
      return existingUser;
    }
    const newUser = await this.userService.createUser(loginData.userName, loginData.userId);
    return newUser;
  }
}
