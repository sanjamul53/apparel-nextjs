import { cookies } from 'next/headers';
import { API_auth_cookie_token } from '@/apiServer/data/auth.data';
import { jwtVerify } from '@/apiServer/libs/jwt/jwtVerify';

export const auth_guard = async () => {

  const cookieStore = cookies();
  const authCookie = cookieStore.get(API_auth_cookie_token);

  if(!authCookie || !authCookie.value) {
    throw new Error('Not signed in');
  }

  const verifiedPayload = await jwtVerify(authCookie.value);

  if (!verifiedPayload) {
    throw new Error('Not signed in');
  }

  return verifiedPayload;

}