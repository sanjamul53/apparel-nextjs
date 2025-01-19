import jwt from 'jsonwebtoken';
import { ty_auth_payload } from '@/apiServer/types/general.type';
import { API_auth_token_expire_time } from '@/apiServer/data/auth.data';

export function jwtSign(payload: ty_auth_payload): Promise<null | string> {
  // https://github.com/auth0/node-jsonwebtoken/issues/705

  const secret_key = process.env.JWT_SECRET_KEY;

  return new Promise((resolve, reject) => {

    if(!secret_key) return null;

    jwt.sign(payload, secret_key, { 
      expiresIn: API_auth_token_expire_time
    }, (err, token) => {

      if (err || !token) {
        return reject(null)
      }
      else {
        return resolve(token);
      }

    });

  });

}