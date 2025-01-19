import { ty_product_cart_item } from "../products.type";

export type ty_dashboard_order_status = 'pending'| 'paid'| 'delivered';

export type ty_dashboard_order_item = {
  _id: string;
  order_at: string;
  status: ty_dashboard_order_status;
  total_price: number;
  total_quantity: number;
}

export type ty_dashboard_order_detail = {
  _id: string;
  deliver_address: string;
  paid_amount: number;
  paid_at: string|null;
  status: ty_dashboard_order_status;
  order_at: string;
  total_price: number;
  total_quantity: number;

  products: ty_product_cart_item[];

}