"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useOrder } from "@/hooks/useOrder";
import { useCart } from "@/hooks/useCart";
import { Fetch } from "@/functions/fetch";
import { cls_join } from "@/functions/cls_join.func";
import { ReactQueryProvider } from "@/lib/react_query/queryClient";
// comp
import { Order_Complete } from "@/components/order/complete_order";
import { Section } from "@/components/shared/section";
import { Stepper } from "@/components/shared/stepper";
import { Order_Products } from "@/components/order/products";
import { Spinner_Section } from "@/components/shared/spinner/section";
import { Order_Payment_Complete } from "@/components/order/complete_payment";
import { Page_Header } from "@/components/shared/page_header";
// style
import classes from '@/styles/order/page.module.css';
// icons
import { IconButton } from "@/components/shared/button/icon_button";
import { Icon_Arrow_Left } from "@/components/icons/arrow_left";
import { Icon_Arrow_Right } from "@/components/icons/arrow_right";
// types
import { ty_cart_item } from "@/types/cart.type";
import { ty_payment_method } from "@/types/order.type";
import { ty_fetch_status } from "@/types/general.type";

type T_createdOrder = {
  status: ty_fetch_status;
  order_id: null;
}

const list = ['Products', 'Order', 'Payment'];

export default function OrderPage() {

  const router = useRouter();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isStepperDisable, setIsStepperDisable] = useState(false);
  const [productList, setProductList] = useState<ty_cart_item[]>([]);
  const [shippingAddress, setShippingAddress] = useState({
    address: '', phone: ''
  });
  const [createdOrder, setCreateOrder] = useState<T_createdOrder | null>(null);

  const [selectedPayMethod, setSelectedPayMethod] =
  useState<ty_payment_method | null>(null);

  const { orderSummary, orderStatus } = useOrder();
  const { cartList, status: cartStatus } = useCart();

  useEffect(() => {

    window.scrollTo({
      top: 0,
      left: 0,
    });

  }, [currentIdx]);



  useEffect(() => {

    if (currentIdx >= list.length - 1) {
      setIsStepperDisable(true);
      return;
    }

    if (list[currentIdx] === 'Order') {

      if (
        !shippingAddress.address || !shippingAddress.phone || 
        !selectedPayMethod || 
        !createdOrder || !createdOrder.order_id
      ) {
        setIsStepperDisable(true);
        return;
      }

    }

    setIsStepperDisable(false);

  }, [currentIdx, selectedPayMethod, shippingAddress, createdOrder]);


  // ====================== check cart data ======================
  useEffect(() => {

    if (orderStatus !== 'success' || cartStatus !== 'success') return;

    if (!orderSummary) {
      router.push('/cart');
      return;
    };

    // filter product data list

    let selectedProducts: ty_cart_item[] = [];

    Object.keys(orderSummary.selectedList).forEach(el => {

      const currentItem = cartList[el];
      if (currentItem) {
        selectedProducts.push(currentItem);
      }

    });

    if (selectedProducts.length === 0) {
      router.push('/cart');
      return;
    };

    setProductList([...selectedProducts]);

  }, [orderStatus, orderSummary, cartStatus, cartList]);

  // ====================== create order handler ======================
  const createOrderHanlder = async () => {


    try {

      if (productList.length < 1) return null;

      setCreateOrder({
        status: 'loading',
        order_id: null
      });

      // generate reqBody
      let orderReqbody = {};

      productList.forEach(prod => {

        let currentVariation = {};

        Object.values(prod.variation_list).forEach(variation => {
          currentVariation = {
            ...currentVariation,
            [variation._id]: variation.quantity
          }
        });

        orderReqbody = {
          ...orderReqbody,
          [prod._id]: currentVariation
        }

      });

      // req to server to create order
      const orderRes: any = await Fetch({
        url: '/orders/create',
        methodType: 'POST',
        data: {
          products: orderReqbody
        },
        options: {
          cache: 'no-cache'
        }
      });


      // remove the cache of created order list
      // invalidate_order_list();

      setCreateOrder({
        status: 'success',
        order_id: orderRes.order_id
      });


      setCurrentIdx(currentIdx + 1);



    }
    catch (err) {
      setCreateOrder({
        status: 'error',
        order_id: null
      });
    }

  }


  const step_increment_handler = () => {
    if (currentIdx >= list.length - 1) return null;
    setCurrentIdx(currentIdx + 1);
  }

  const step_decrement_handler = () => {
    if (currentIdx === 0) return null;
    setCurrentIdx(currentIdx - 1);
  }


  const renderComp = () => {

    if (list[currentIdx] === 'Products' && orderSummary) {
      return <Order_Products
        products={productList} summary={orderSummary.summaryData}
      />;
    }

    else if (list[currentIdx] === 'Order') {
      return <Order_Complete
        submitHanlder={createOrderHanlder}
        selectedMethod={selectedPayMethod}
        setSelectedMethod={setSelectedPayMethod}
        shippingAddress={shippingAddress}
        setShippingAddress={setShippingAddress}
      />
    }

    else if (
      list[currentIdx] === 'Payment' &&
      createdOrder && createdOrder.order_id
    ) {
      return (
        <Order_Payment_Complete order_id={createdOrder.order_id} />
      )
    }

  }

  return (
    <ReactQueryProvider>

      <Page_Header
        title="Place New Order"
        nav_list={[{ label: 'Order', link: null } ]}
      />

      <Spinner_Section
        isVisible={
          (createdOrder && createdOrder.status === 'loading') ?
            true : false
        }
      >

        <Section content_cls={classes.stepper_div} >
          <Stepper list={list} currentIdx={currentIdx} 
            clsName={classes.stepper} 
          />
        </Section>


        <div className={classes.content} >

          {
            renderComp()
          }

        </div>


        <Section
          section_cls={cls_join([classes.stepper_div, classes.btn_div])}
          content_cls={classes.stepper}
        >

          <IconButton
            disabled={currentIdx === 0}
            onClick={step_decrement_handler}
          >
            <Icon_Arrow_Left scale={0.6} />
          </IconButton>

          <IconButton
            disabled={isStepperDisable}
            onClick={step_increment_handler}
          >
            <Icon_Arrow_Right scale={0.6}
              fill={isStepperDisable ? 'rgba(0, 0, 0, 0.4)': 'var(--color_black)'}
            />
          </IconButton>

        </Section>

      </Spinner_Section>
    </ReactQueryProvider>

  )

};