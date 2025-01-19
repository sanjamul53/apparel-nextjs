import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import fetch from 'node-fetch';
import { error_response } from '@/apiServer/controller/err_res';
import { get_one_user_by_googleId } from '@/apiServer/controller/user/getOne';

import { Users } from "@/apiServer/models/user.model";
import { dbConnect } from '@/apiServer/libs/mongoose/connect';
import { jwtSign } from '@/apiServer/libs/jwt/jwtSign';
import { API_auth_token_expire_time, API_auth_cookie_token } 
from '@/apiServer/data/auth.data';



export async function POST(request: NextRequest) {

  const AUTH_ERR_MSG = 'Failed to sign in';

  try {

    const reqBody = await request.json();

    if (!reqBody) {
      throw new Error(AUTH_ERR_MSG);
    }

    const auth_code = reqBody.code;

    if (!auth_code || typeof auth_code !== 'string') {
      throw new Error(AUTH_ERR_MSG);
    }

    // check env variables
    if (
      !process.env.GOOGLE_AUTH_CLIENT ||
      !process.env.GOOGLE_AUTH_SECRET ||
      !process.env.GOOGLE_AUTH_REDIRECT
    ) {
      throw new Error(`${AUTH_ERR_MSG} - invalid key`);
    }

    //  Exchange authorization code for refresh and access tokens
    const googleFetch = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.GOOGLE_AUTH_CLIENT,
        client_secret: process.env.GOOGLE_AUTH_SECRET,
        code: auth_code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.GOOGLE_AUTH_REDIRECT
      })
    })

    if (!googleFetch.ok) {
      throw new Error(`${AUTH_ERR_MSG} - google fetch`);
    }

    const googleRes: any = await googleFetch.json();

    if (!googleRes.access_token) {
      throw new Error(`${AUTH_ERR_MSG} - access_token is missing`);
    }

    //  decode token and get the user data
    const gUserDataRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${googleRes.access_token}`
      }
    });


    if (!gUserDataRes.ok) {
      throw new Error(`${AUTH_ERR_MSG} - failed to fetch guser data`);
    }


    const gUserData: any = await gUserDataRes.json();

    if (
      !gUserData || !gUserData.id || !gUserData.email || !gUserData.name ||
      !gUserData.picture
    ) {
      throw new Error(`${AUTH_ERR_MSG} - invalid guser data`);
    }
    
    await dbConnect();

    
    // check is user Exist
    let targetUserId: string;
    const isUserExist = await get_one_user_by_googleId(gUserData.id);

    // if user don't exist, then create new user
    if(!isUserExist) {

      const newUser = await Users.create({
        name: gUserData.name,
        email: gUserData.email,
        google_id: gUserData.id,
        image: gUserData.picture
      });

      targetUserId = newUser._id;
    }
    else {
      targetUserId = isUserExist._id;
    }

    // generate token
    const jwtToken = await jwtSign({ _id: targetUserId });

    if(!jwtToken) {
      throw new Error(`${AUTH_ERR_MSG} - generate jwt token`);
    }

    // send token by cookie
    cookies().set({
      name: API_auth_cookie_token,
      value: jwtToken,
      httpOnly: true,
      secure: false,
      path: '/',
      maxAge: API_auth_token_expire_time
    });

    return NextResponse.json({
      userId: targetUserId
    });

  }
  catch (e) {

    return error_response(e);

  }

}