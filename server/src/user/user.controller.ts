import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async loginUser(@Body() loginData: { userName: string; userId: string }) {
    const existingUser = await this.userService.findUser(loginData.userId);
    if (existingUser) {
      return existingUser;
    }
    const newUser = await this.userService.createUser(loginData.userName, loginData.userId);
    return newUser;
  }
}