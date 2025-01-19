import jwt from 'jsonwebtoken';
import { ty_auth_payload } from '@/apiServer/types/general.type';

export function jwtVerify(token: string): Promise<null | ty_auth_payload> {

  const secret_key = process.env.JWT_SECRET_KEY;

  return new Promise((resolve, reject) => {

    if(!secret_key) return null;

    jwt.verify(token, secret_key, (err, payload) => {

      if (err || !payload) {
        return reject(null)
      }
      else {
        return resolve(payload as ty_auth_payload);
      }

    })

  });

}