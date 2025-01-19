import { FC, Dispatch, SetStateAction } from 'react';
import { ty_payment_method } from '@/types/order.type';
import { Button } from '@/components/shared/button/button';
import classes from '@/styles/order/shared/payment_method.module.css';
import { NextImage } from '@/components/shared/nextImage';
import { Typo } from '@/components/shared/typography';


type T_pay_method = {
  img: string; name: ty_payment_method;
  title: string; isDiabled?: boolean;
}

const pay_method_list: T_pay_method[] = [
  {
    img: '/images/order/pay_method_paypal.png',
    name: 'paypal',
    title: 'Paypal Payment'
  },
  {
    img: '/images/order/pay_method_card.png',
    name: 'card',
    title: 'Pay with Card',
    isDiabled: true
  },
  {
    img: '/images/order/pay_method_bank.png',
    name: 'bank',
    title: 'Bank Transfer',
    isDiabled: true
  },
];

interface IComp {
  selectedMethod: ty_payment_method | null;
  setSelectedMethod: Dispatch<SetStateAction<ty_payment_method | null>>;
  paymentHanlder: () => void;
  is_disabled: boolean;
}

export const Payment_Method: FC<IComp> = ({
  selectedMethod, setSelectedMethod, paymentHanlder, is_disabled
}) => {

  const selectHanlder = (item: T_pay_method) => {
    if (item.isDiabled) return null;
    setSelectedMethod(item.name);
  }

  return (
    <div className={classes.root}>


      <div className={classes.pay_item_div}>


        {
          pay_method_list.map(el => (
            <div key={el.name} className={classes.pay_item}
              onClick={() => selectHanlder(el)}
              style={{
                ...(el.isDiabled && { cursor: 'default', })
              }}
            >

              <div className={classes.pay_item_img} >
                <NextImage
                  src={el.img} alt="logo"
                  width={35} height={35}
                  without_placeholder={true}
                />
              </div>

              <Typo txt={el.title} margin="0 1rem"
                clsName={classes.pay_item_name}
                size="1.6rem" weight={500}
              />

              <div
                className={classes.pay_item_circle}
                style={{
                  ...(el.name === selectedMethod && {
                    borderColor: 'var(--color_primary)'
                  })
                }}
              >

                {
                  el.name === selectedMethod && (
                    <span className={classes.pay_item_circle_span} >

                    </span>
                  )
                }

              </div>

            </div>
          ))
        }

      </div>


      <div style={{ marginTop: '5rem' }} >
        <Button Sx={{ width: '100%' }}
          onClick={paymentHanlder}
          disabled={
            (!selectedMethod || is_disabled) ? true : false
          }
        >
          COMPLETE ORDER
        </Button>
      </div>

    </div>
  )
};