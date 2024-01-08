import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: any) {
    const user = await this.usersService.createUser(body);
    return { message: 'User created', data: user };
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    const user = await this.usersService.getUser(userId);
    return { message: 'User retrieved', data: user };
  }

  @Get(':userId/avatar')
  async getUserAvatar(@Param('userId') userId: string) {
    const avatar = await this.usersService.getUserAvatar(userId);
    return { message: 'User avatar retrieved', data: avatar };
  }

  @Delete(':userId/avatar')
  async deleteUserAvatar(@Param('userId') userId: string) {
    await this.usersService.deleteUserAvatar(userId);
    return { message: 'User avatar deleted' };
  }
}
