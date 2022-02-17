import { DeepPartial } from 'typeorm';
import User from '../entities/user.entity';

export interface FindUserDto extends DeepPartial<User> {
  id?: number;
}

export interface FindUserOptions {
  secret?: boolean;
}
