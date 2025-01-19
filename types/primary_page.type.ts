import { ty_product_item } from "./products.type";

export interface ty_primary_cat_product {
  [key: string]: ty_product_item[];
}

export interface ty_primary_offer_product_item {
  _id: string;
  name: string;
  offer: number;
  image_variation: string;
  offer_title?: string;
  sale_end_date?: number;
}