import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';

interface IComp {
  order_id: string;
}

export const Order_Payment_Paypal: FC<IComp> = ({ order_id }) => {

  const router = useRouter();

  function createOrder() {

    return fetch("/api/payment/paypal/createOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: order_id
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  }

  
  function onApprove(data: any) {

    return fetch("/api/payment/paypal/captureOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID
      })
    })
    .then((response) => response.json())
    .then((orderData) => {

      // change to success page
      router.push('/message/successPayment');
         
    });


  }


  return (
    <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID }}>
      <PayPalButtons
        createOrder={createOrder}
      onApprove={onApprove}
      />
    </PayPalScriptProvider>
  );

}