import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { DeepPartial } from 'typeorm';

import User from './entities/user.entity';
import { UserService } from './user.service';

class UserMockRepository {
  userList: User[];
  constructor() {
    this.userList = [];
  }

  create(entityLike: DeepPartial<User>): User {
    const user: User = new User();
    Object.assign(user, entityLike);
    user.id = this.userList.length + 1;
    return user;
  }
  // NOTE 유저가 저장될 위치

  async save(user: User): Promise<User> {
    this.userList.push(user);
    return user;
  }

  async findOne(id: number): Promise<User | undefined> {
    const foundUser = this.userList.find(user => user.id === id);
    if (foundUser) return foundUser;
    return undefined;
  }

  async findAll(): Promise<User[]> {
    return this.userList;
  }
}


describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: UserMockRepository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService=module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  it ('service should be defined', () => {
    expect(userService).toBeDefined();
  })
});
