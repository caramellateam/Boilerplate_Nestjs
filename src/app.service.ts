import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class AppService {
  constructor(
    @Inject(REQUEST) private request: Request,
  ) {
    this.request = request;
  }

  getIp(): string {
    console.log('get Ip');
    const ip = `${this.request.headers['x-forwarded-for'] || this.request.socket.remoteAddress}`;
    return ip;
  }

  getVersion(): string {
    const version = process.env.APP_VERSION || 'undefined';
    return version;
  }
}
