import { NextResponse, NextRequest } from 'next/server';
import { auth_guard } from '@/apiServer/controller/auth/auth_guard';
import { error_response } from '@/apiServer/controller/err_res';
import { isValidObjectId } from '@/apiServer/functions/isValidObjectId';
import { stringToObjectId } from '@/apiServer/functions/stringToObjectId';
import { dbConnect } from '@/apiServer/libs/mongoose/connect';
import { Orders } from '@/apiServer/models/order.model.';

export async function DELETE(request: NextRequest) {

  try {

    // check auth
    const authData = await auth_guard();

    const searchParams = request.nextUrl.searchParams;

    // page param
    const id_param = searchParams.get('id');

    if(!id_param || !isValidObjectId(id_param)) {
      throw new Error('Invalid order');
    }

    await dbConnect();

    const getOrder = await Orders.findOne(
      {
        _id: stringToObjectId(id_param),
        user_id: stringToObjectId(authData._id)
      },
      {
        _id: 1, user_id: 1, paid_amount: 1, status: 1
      }
    ).lean();

    if(!getOrder) {
      throw new Error('Order not found');
    }

    if(
      `${getOrder.user_id}` !== authData._id ||
      getOrder.paid_amount > 0 ||
      getOrder.status !== 'pending'
    ) {
      throw new Error("Can't delete order");
    }

    await Orders.deleteOne({
      _id: getOrder._id
    });

    return NextResponse.json({
      status: 'deleted'
    });

  }
  catch (err) {

    return error_response(err);

  }

}