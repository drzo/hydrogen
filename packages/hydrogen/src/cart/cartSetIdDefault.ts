import {type ResponseStub} from '@remix-run/server-runtime/dist/single-fetch';
import {HydrogenSession} from '../hydrogen';
import {stringify} from 'worktop/cookie';

export type CookieOptions = {
  maxage?: number;
  expires?: Date | number | string;
  samesite?: 'Lax' | 'Strict' | 'None';
  secure?: boolean;
  httponly?: boolean;
  domain?: string;
  path?: string;
};

export const cartSetIdDefault = (cookieOptions?: CookieOptions) => {
  return (cartId: string, response?: ResponseStub) => {
    const headers = response ? response.headers : new Headers();
    headers.append(
      'Set-Cookie',
      stringify('cart', cartId.split('/').pop() || '', {
        path: '/',
        ...cookieOptions,
      }),
    );

    return headers;
  };
};
