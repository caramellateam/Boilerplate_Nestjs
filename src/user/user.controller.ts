import {
  Controller, Get, Post,
  Body, Patch, Param, Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  @ApiBody({
    description: '유저 생성',
    type: CreateUserDto,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return {
      data: user,
    };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
