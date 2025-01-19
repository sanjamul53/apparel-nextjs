import { NextResponse, type NextRequest } from 'next/server';
import { dbConnect } from '@/apiServer/libs/mongoose/connect';
import { error_response } from '@/apiServer/controller/err_res';
import { Users } from '@/apiServer/models/user.model';
import { stringToObjectId } from '@/apiServer/functions/stringToObjectId';
import { auth_guard } from '@/apiServer/controller/auth/auth_guard';


export async function GET(request: NextRequest ) {

  try {

    // check auth guard
    const authData = await auth_guard();

    await dbConnect();

    const userData = await Users.findOne({
      _id: stringToObjectId(authData._id)
    })
    .select({
      _id: 1, name: 1, email: 1, image: 1
    })
    .lean();

    if(!userData) {
      throw new Error('user not found');
    }

    return NextResponse.json(userData);

  }
  catch (e) {

    return error_response(e);

  }

}