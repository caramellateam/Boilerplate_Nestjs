import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ENCRYPT_UTIL from '@src/utils/encrypt.util';

import User from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.userRepository = userRepository;
  }

  async create(createUserDto: CreateUserDto): Promise<User|undefined> {
    const {
      email, name, password,
    } = createUserDto;

    const [hash, salt] = ENCRYPT_UTIL.encrypt(password);

    const user = this.userRepository.create({
      email,
      name,
      hash,
      salt,
    });

    try {
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch (err) {
      Logger.error(err.message || '유저를 생성하는 과정에서 에러 발생.');
      throw new Error('유저를 생성하는 과정에서 에러 발생.');
    }
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
