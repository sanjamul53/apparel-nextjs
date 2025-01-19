import { NextResponse } from 'next/server';


export const error_response = (e: any, status?: number) => {

  const err = e as Error;

  return NextResponse.json(
    {
      error: err.message ? err.message: 'server error'
    },
    {
      status: status || 500
    }
  );

}