import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  findAll() {
    return 0;
  }

  findOne(id: number) {
    return id;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(id);
    return updateUserDto;
  }

  remove(id: number) {
    return id;
  }
}
