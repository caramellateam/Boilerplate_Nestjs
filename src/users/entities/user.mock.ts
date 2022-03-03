import { DeepPartial } from 'typeorm';
import type { FindUserDto } from '../interfaces/find.interface';

import User from './user.entity';

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

  async findOne(filter: FindUserDto | number): Promise<User | undefined> {
    const foundUser = this.userList.find((user) => {
      if (typeof filter === 'number') {
        if (filter === user.id) return true;
      } else {
        if (filter.id && filter.email) {
          return (user.id === filter.id && user.email === filter.email);
        }
        if (filter.id) return user.id === filter.id;
        if (filter.email) return user.email === filter.email;
        return false;
      }
    });
    if (foundUser) return foundUser;
    return undefined;
  }

  async findAll(): Promise<User[]> {
    return this.userList;
  }
}

export default UserMockRepository;
