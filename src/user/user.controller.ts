import {
  Controller,
  Query,
  Get,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';

import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAllUser();
  }
  @Post()
  addToCart(@Query() query: any): Promise<User> {
    const { userId, productId } = query;

    return this.userService.addToCart(userId, productId);
  }
  @Delete()
  deleteItem(@Query() query: any): Promise<User> {
    const { userId, productId } = query;

    return this.userService.deleteItem(userId, productId);
  }
  @Put()
  incremnetQty(@Query() query: any): Promise<User> {
    const { userId, productId } = query;

    return this.userService.incrementQty(userId, productId);
  }
  @Put(':userId')
  deceremntQty(
    @Param('userId') userId: string,
    @Query() query: any,
  ): Promise<User> {
    const { productId } = query;

    return this.userService.decerementQty(userId, productId);
  }
}
