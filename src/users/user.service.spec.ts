import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import User from './entities/user.entity';
import UserMockRepository from './entities/user.mock';
import { UserService } from './user.service';




describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: UserMockRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('유저 서비스가 정의 되어야하만함.', () => {
    expect(userService).toBeDefined();
  });

  describe('CRUD TEST', () => {
    const createUser: CreateUserDto = {
      name: 'dogyun',
      email: 'hacker@bdev.io',
      password: 'hacker',
    };


    it('if create user instance must return User.', async () => {
      expect(await userService.create(createUser)).toBeInstanceOf(User);
    });

    it('find without parameter should return undefined', async () => {
      expect(await userService.findOne({})).toBe(undefined);
    });

    it ('find user with id', async () => {
      const createdUser = await userService.create(createUser);
      // NOTE create Instance

      const user = await userService.findOne(1);
      expect(user).toBe(createdUser);
    });

    it.todo('find user with email');
    it.todo('find user with unknown email');

    it.todo('find user with email and id');
    it.todo('find user with unknown email and known id');
    it.todo('find user with known email and unknown id');

    it.todo('update user with id');
    it.todo('update user with unknown id');

    it.todo('delete user with id');
    it.todo('delete user with unexpected error');

  });
});
