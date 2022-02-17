import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from './app.service';




describe('UserService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
      ],
    }).compile();

    appService= module.get<AppService>(AppService);
  });

  it('유저 서비스가 정의 되어야하만함.', () => {
    expect(appService).toBeDefined();
  });

  describe('APP SERVICE', () => {
    it ('app Service', async () => {
      expect(1).toBe(1);
    })
    // it('update test', async () => {
    //   expect(await userSErvice.update(1, createUser)).toStrictEqual(createUser);
    // });
    // it('delete test', async () => {

    // });
  });
});
