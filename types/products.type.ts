import { ty_cart_variation_item } from "./cart.type";

export interface ty_product_item {
  _id: string;
  name: string;
  price: { min: number; max: number };
  offer: number;
  image_variation: string;
  brand: string;
}

export interface ty_product_filter_data_item {
  _id: string|number;
  total?: number;
  label?: string;
}

export interface ty_product_filter_data_additonal {
  _id: string|number;
  total: number;
}

export interface ty_product_filter_data_list {
  additional: ty_product_filter_data_additonal[];
  color_family: ty_product_filter_data_item[];
  sizes: ty_product_filter_data_item[];
  sub_list: ty_product_filter_data_item[];
  brand: ty_product_filter_data_item[];
}


// ======================== product one detail ========================

export interface ty_product_one_detail_variation_item {
  _id: string;
  color: string;
  color_hex: string;
  size: string;
  price: number;
  front_image?: string;
  back_image?: string;
  side_image?: string;
}

export interface ty_product_one_detail {

  _id: string;
  name: string;
  price: {
    min: number;
    max: number;
  };
  offer: number;
  image_primary: string;
  image_variation: string;
  brand: string;
  styleName: string;
  baseCategory: string;
  sub_list: number[];
  total_sold: number;
  rating_sum: number;
  rating_quantity: number;
  description: string;
  variation_list: ty_product_one_detail_variation_item[];

}


// ======================== product query ========================

export type ty_product_query_param = 'brand' | 'sleeve_length'| 'feature'|
 'collar'| 'fit'| 'thickness'| 'color' | 'size' | 'type'| 'sale';
 

// ======================== cart product ========================

export interface ty_product_cart_item {
  _id: string;
  name: string;
  primary_img: string;
  brand: string;
  variation_list: ty_cart_variation_item[];
}