import { NextResponse } from 'next/server';
import { error_response } from '@/apiServer/controller/err_res';
import { cookies } from 'next/headers';
import { API_auth_cookie_token } from '@/apiServer/data/auth.data';


export async function GET() {

  try {

    cookies().delete(API_auth_cookie_token);

    return NextResponse.json({
      message: 'signout'
    });

  }
  catch(e) {

    return error_response(e);

  }

}
