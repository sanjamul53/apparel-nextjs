import { NextResponse } from 'next/server';
import { error_response } from '@/apiServer/controller/err_res';
import { auth_guard } from '@/apiServer/controller/auth/auth_guard';

export async function GET() {

  try {

    const authData = await auth_guard();

    return NextResponse.json({
      userId: authData._id
    });

  }
  catch(e) {

    return error_response(e);

  }

}
