/* eslint-disable indent */

import {
  IsString,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '유저 이름',
    default: '개발자',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '유저 이메일',
    default: 'test@bdev.io',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '유저 비밀번호',
    default: 'testpass',
  })
  @IsString()
  password: string;
}
