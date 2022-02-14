import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CRUD TEST', () => {
    const createUser: CreateUserDto = {
      name: 'test',
      email: 'test@test.com',
      password: 'testpass',
      username: 'tester',
    };
    it('create test', async () => {
      expect(await service.create(createUser)).toStrictEqual(createUser)
    });
    it('read test', async () => {
      expect(await service.findOne(1)).toBe(1);
    });
    it('update test', async () => {
      expect(await service.update(1, createUser)).toStrictEqual(createUser);
    });
    it('delete test', async () => {

    });
  });
});
