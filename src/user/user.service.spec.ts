import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { DeepPartial } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
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


    it('반환된 결과가 User 인스턴스여야함.', async () => {
      expect(await userService.create(createUser)).toBeInstanceOf(User);
    });
    it('read test', async () => {
      expect(await userService.findOne(1)).toBe(1);
    });

    // it('update test', async () => {
    //   expect(await userSErvice.update(1, createUser)).toStrictEqual(createUser);
    // });
    // it('delete test', async () => {

    // });
  });
});
