import User from '@src/users/entities/user.entity';

export interface ITokenPayload {
  id: User['id'],
  email: User['email'],
}
