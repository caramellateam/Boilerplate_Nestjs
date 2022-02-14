import { pbkdf2Sync } from 'pbkdf2';
import { createHash, randomBytes } from 'crypto';

const ENCRYPT_UTIL = {
  encrypt: (password: string): [string, string] => {
    const salt: string = randomBytes(256).toString('base64');
    const hash: string = pbkdf2Sync(password, salt, 2048, 256, 'sha512').toString('base64');
    return [
      hash,
      salt,
    ];
  },
  verify: (password: string, hash: string, salt: string): boolean => {
    const result: boolean = (
      pbkdf2Sync(password, salt, 2048, 256, 'sha512').toString('base64') === hash)
      || (pbkdf2Sync(password, salt, 1024, 256, 'sha512').toString('base64') === hash);
    return result;
  },

  simpleEnc: (value: string, length: number): string => (
    createHash('sha512')
      .update(value)
      .digest('base64')
      .replace(/[^a-zA-Z0-9 ]/g, '_')
      .slice(0, length || undefined)
  ).trim(),
};

export default ENCRYPT_UTIL;
