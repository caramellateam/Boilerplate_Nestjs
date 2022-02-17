import Users from '@src/users/entities/user.entity';

declare global {
  namespace Express {
    // tslint:disable-next-line:no-empty-interface
    export interface AuthInfo { }
    // tslint:disable-next-line:no-empty-interface
    export interface User extends Users{
      // NOTE override JWT USER INFO
      iat?: number,
      exp?: number,
      iss?: string,
    }

    export interface Request {
      authInfo?: AuthInfo | undefined;
      user?: User | undefined;

      // These declarations are merged into express's Request type
      login(user: User, done: (err: any) => void): void;
      login(user: User, options: any, done: (err: any) => void): void;
      logIn(user: User, done: (err: any) => void): void;
      logIn(user: User, options: any, done: (err: any) => void): void;

      logout(): void;
      logOut(): void;

      isAuthenticated(): this is AuthenticatedRequest;
      isUnauthenticated(): this is UnauthenticatedRequest;
    }

    export interface AuthenticatedRequest extends Request {
      user: User;
    }

    export interface UnauthenticatedRequest extends Request {
      user?: undefined;
    }
  }
}
declare namespace Express {
  // tslint:disable-next-line:no-empty-interface
  export interface AuthInfo { }
  // tslint:disable-next-line:no-empty-interface
  export interface User extends Users {
    // NOTE override JWT USER INFO
    iat?: number,
    exp?: number,
    iss?: string,
  }

  export interface Request {
    authInfo?: AuthInfo | undefined;
    user?: User | undefined;

    // These declarations are merged into express's Request type
    login(user: User, done: (err: any) => void): void;
    login(user: User, options: any, done: (err: any) => void): void;
    logIn(user: User, done: (err: any) => void): void;
    logIn(user: User, options: any, done: (err: any) => void): void;

    logout(): void;
    logOut(): void;

    isAuthenticated(): this is AuthenticatedRequest;
    isUnauthenticated(): this is UnauthenticatedRequest;
  }

  export interface AuthenticatedRequest extends Request {
    user: User;
  }

  export interface UnauthenticatedRequest extends Request {
    user?: undefined;
  }
}