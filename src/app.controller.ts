import {
  Controller, Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { GResponse } from './interceptors/transformer.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    this.appService = appService;
  }

  @ApiTags('Root')
  @Get()
  getVersion(): GResponse<string> {
    const version = this.appService.getVersion();
    return {
      data: version,
    };
  }

  @ApiTags('Root')
  @Get()
  getIp(): GResponse<string> {
    const ip = this.appService.getIp();
    return {
      data: ip,
    };
  }
}
