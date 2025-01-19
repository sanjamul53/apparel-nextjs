
export interface ty_cart_variation_item {
  _id: string;
  size: string;
  color: string;
  img?: string;
  quantity: number;
  price_single: number;
}


export interface ty_cart_item {
  _id: string;
  name: string;
  primary_img: string;
  brand: string;
  variation_list: {
    [variationId: string]: ty_cart_variation_item
  }
}

export interface ty_cart_list {
  [productId: string]: ty_cart_item
}


export type ty_selected_cart_list = { [_id: string]: true }
