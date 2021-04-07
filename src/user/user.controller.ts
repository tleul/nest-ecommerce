import { Controller, Query, Get, Param, Post } from '@nestjs/common';

import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAllUser();
  }
  @Post('')
  addToCart(@Query() query: any): Promise<User> {
    const { userId, productId } = query;

    return this.userService.addToCart(userId, productId);
  }
}
