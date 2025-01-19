import { error_response } from '@/apiServer/controller/err_res';
import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';



export async function GET() {

  try {

    cookies().set(
      'a', 'b', 
      { 
        maxAge:  3*24*60*60*100 // 3 days
      }
    )

    cookies().set({
      name: 'name',
      value: 'lee',
      httpOnly: true,
      secure: false,
      path: '/',
    })

    return NextResponse.json({ status: 'tests' });


  }
  catch (err) {

    return error_response(err);

  }

}