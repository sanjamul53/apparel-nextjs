// module
import { Fragment } from "react";
import { Fetch } from "@/functions/fetch";
// comp
import { Page_Header } from "@/components/shared/page_header";
import { Primary_Data } from "@/components/products/details/primary_data";
import { Secondary_Data } from "@/components/products/details/secondary_data";
// types
import { ty_product_item, ty_product_one_detail } from "@/types/products.type";
import { ty_page_url } from "@/types/general.type";

interface IFetchData {
  target_product: ty_product_one_detail;
  similar_products: ty_product_item[]
}

const fetch_product = async (product_id: string) => {

  try {

    const res = await Fetch<IFetchData>({
      url: `/products/details/${product_id}`,
      methodType: 'GET'
    })

    return res;

  }
  catch(err) {
    return null;
  }
}

export default async function Page({ params }: ty_page_url) {

  let product_id = null;
  if(params && params['id'] && typeof params['id'] === 'string' ) {
    product_id = params['id'];
  }

  if(!product_id) return null;

  const product_data = await fetch_product(product_id);

  if(!product_data || !product_data.target_product) {
    return null;
  }

  // genrate default img_list
  const first_variation = product_data.target_product.variation_list[0];

  let default_img_list: string[] = [];
  if(first_variation) {
    if(first_variation.front_image) default_img_list.push(first_variation.front_image);
    if(first_variation.back_image) default_img_list.push(first_variation.back_image);
    if(first_variation.side_image) default_img_list.push(first_variation.side_image);
  }
  default_img_list.push(product_data.target_product.image_primary);

  // console.log(default_img_list);

  return (
    <Fragment>

      <Page_Header
        title="Product Details"
        nav_list={
          [ { label: 'Product', link: null } ]
        }
      />
      
      <Primary_Data 
        product={product_data.target_product}
        default_img_list={default_img_list}
        default_color={
          first_variation ?
          { name: first_variation.color, hex: first_variation.color_hex } :
          null
        }
      />

      <Secondary_Data productList={product_data.similar_products} />

    </Fragment>
  )

}