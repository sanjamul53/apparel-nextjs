import { FC } from 'react';
import { NextImage } from '../shared/nextImage';
import { Button } from '../shared/button/button';
import { Fetch } from '@/functions/fetch';

const centerStyle = {display: 'flex', justifyContent: 'center'};

interface IComp {
  clearAuth: () => void;
}

export const Sign_Out: FC<IComp> = ({ clearAuth }) => {

  const signOutHanlder = async () => {
    try {

      await Fetch({
        url: '/auth/signout',
        methodType: 'GET'
      })

      clearAuth();

    }
    catch(err){

    }
  }

  return (
    <div>

      <div style={centerStyle} >
        <NextImage alt="sign out"
          src="/images/dashboard/sign_out.png"
          width={120} height={120}
        />
      </div>

      <div style={{ ...centerStyle, marginTop: '3rem' }} >
        <Button variant="contained" onClick={signOutHanlder} > 
          Are you sure to sign out? 
        </Button>
      </div>

    </div>
  )

};