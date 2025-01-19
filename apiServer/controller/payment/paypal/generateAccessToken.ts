import { api_payment_paypal_base_url as base_url } from '@/apiServer/data/payment.data';
import fetch from 'node-fetch';


export const generateAccessToken = async () => {
  
  try {

    const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
    const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }

    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
    ).toString("base64");

    const response = await fetch(`${base_url}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    if(!response.ok) {
      throw new Error('failed');
    }

    const data: any = await response.json();

    if(!data || !data.access_token) {
      throw new Error('failed');
    }

    return data.access_token as string;

  } catch (error) {
    return null;
  }
};