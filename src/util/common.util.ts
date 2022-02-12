import { ICommonResponseStruct } from './common.interface';

const isProduction = (process.env.NODE_ENV || 'development') === 'production' || false;

const COMMON_UTIL = {
  isProduction,

  makeResponseData: (data?: any, message?: string): ICommonResponseStruct => ({
    data,
    message,
  }),

  convertPrettyKST(time: string | number | Date, simple?: boolean, hmsOnly?: boolean): string {
    const dateObj = new Date(time);
    const date = (`0${dateObj.getDate()}`).slice(-2);
    const month = (`0${(dateObj.getMonth() + 1)}`).slice(-2);
    const year = dateObj.getFullYear();
    const hour = (`0${dateObj.getHours()}`).slice(-2);
    const minute = (`0${dateObj.getMinutes()}`).slice(-2);
    const second = (`0${dateObj.getSeconds()}`).slice(-2);
    if (simple) {
      if (hmsOnly) return `${hour}:${minute}:${second}`;
      return `${year}${month}${date}_${hour}${minute}${second}`;
    }
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  },
  longDateTimeStr(time?: Date): string {
    const now: Date = time || new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');
    const milSec = now.getMilliseconds().toString().padStart(6, '0');
    const nowLongString = `${year}${month}${day}${hour}${minute}${second}${milSec}`;
    // Logger.debug(`GENERATE ${nowLongString}`);
    return nowLongString;
  },

  randomGenerator(n: number, c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
    let r = ''; const cl = c.length; for (let i = 0; i < n; i += 1) { r += c.charAt(Math.floor(Math.random() * cl)); } return r;
  },

  randomString(n: number): string {
    return COMMON_UTIL.randomGenerator(n);
  },

  randomNumber(n: number): string {
    return COMMON_UTIL.randomGenerator(n, '0123456789');
  },
};

export default COMMON_UTIL;
