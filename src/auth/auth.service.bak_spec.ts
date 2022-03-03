import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from '@src/users/user.service';
import UserMockRepository from '@src/users/entities/user.mock';

import { getRepositoryToken } from '@nestjs/typeorm';
import User from '@src/users/entities/user.entity';
import { CreateUserDto } from '@src/users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

jest.mock("@nestjs/jwt", () => ({
  sign: jest.fn(() => 'test'),
  verify: jest.fn(() => ({ id: 1 })),
}));

// jest.mock("@src/users/user.service", () => ({
//   findAll: jest.fn(() => [{ id: 1 }]),
//   findOne: jest.fn(() => ({ id: 1 })),
// }));


describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: UserMockRepository,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              // this is being super extra, in the case that you need multiple keys with the `get` method
              if (key === 'JWT_SECRET') {
                return 'TEST_KEY';
              }
              return null;
            })
          }
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  describe('auth service', () => {
    it ('jwt service must be defined', () => {
      expect(jwtService).toBeDefined();
    })
    it ('auth service must be defined', () => {
      expect(userService).toBeDefined();
    })

    describe('RED', () => {
      it ('verify Wrong Email and Password Must Red', async () => {
        expect(1).toBe(1);
      });
    });

    describe('GREEN', () => {
      it ('verify Email and Password Must Green', async () => {
        // NOTE 테스트 계정 생성
        const createUser: CreateUserDto = {
          name: 'dogyun',
          email: 'admin@bdev.io',
          password: 'admin',
        };
        await userService.create(createUser);
        // NOTE 유저생성
        const result = await service.validateUser('admin@bdev.io', 'admin');
        // NOTE 로그인 시도
        expect(result).toStrictEqual({ id: 1, name: createUser.name, email: createUser.email });
      });
    })
  })

  describe('endpoint related', () => {
    it.todo('get info must return info');

    it.todo('request login must return access, refresh token');

    it.todo ('request login with wrong info must error');

    it.todo('request access token with refresh must return access token');
    
    it.todo('request access token with wrong info must error');

  })
})