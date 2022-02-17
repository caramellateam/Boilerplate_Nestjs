import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';


class RequestMockFactory {
  headers: Record<string, string> = {};
  socket: { remoteAddress: string };
  constructor() {
    this.headers = {
      'x-forwarded-for': '127.0.0.1',
    }
    this.socket = { remoteAddress: '127.0.0.' };
  }
}

const rMockFactory = async () => (RequestMockFactory);

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: 'REQUEST',
          useFactory: rMockFactory,
        }
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);


    Object.assign(appService, {
      getIp: jest.fn(() => '127.0.0.1'),
      getVersion: jest.fn(() => process.env.APP_VERSION || '0.0.0'),
    });
  });

  describe('root', () => {
    it('controller.getIp expect return 127.0.0.1', () => {
      expect(appController.getIp()).toStrictEqual({ data: '127.0.0.1' });
    });

    it('controller getVersion expect return version or 0.0.0', () => {
      expect(appController.getVersion()).toStrictEqual({ data: '0.0.0' });
    })
  });
});

// NOTE 만약 mock 할수 없을경우, spyon 사용