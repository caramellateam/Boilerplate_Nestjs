import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import ENCRYPT_UTIL from '@src/utils/encrypt.util';

import User from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { FindUserDto, FindUserOptions } from './interfaces/find.interface';

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

  async findOne(filter: FindUserDto | number, options?: FindUserOptions)
  : Promise<User | undefined> {
    const secretSelectOptions: FindOneOptions<User> = {
      select: options?.secret
        ? ['id', 'name', 'email', 'hash', 'salt', 'createdAt', 'updatedAt']
        : ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    };
    if (typeof filter === 'number') {
      const user = await this.userRepository.findOne(+filter, secretSelectOptions);
      return user;
    }

    const { id, email } = filter;

    if (filter.email && filter.id) {
      const user = await this.userRepository.findOne({ id, email }, secretSelectOptions);
      if (user) return user;
    } else if (filter.email) {
      const user = await this.userRepository.findOne({ email }, secretSelectOptions);
      console.log (email);
      if (user) return user;
    } else if (filter.id) {
      const user = await this.userRepository.findOne(id, secretSelectOptions);
      if (user) return user;
    }
    return undefined;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(id);
    return updateUserDto;
  }

  remove(id: number) {
    return id;
  }
}
