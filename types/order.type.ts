export type ty_create_order_reqBody = {

  [productId: string]: {
    [variationId: string]: number; // [variationId]: quantity
  }

}

export type ty_payment_method = 'paypal'| 'card'| 'bank';
