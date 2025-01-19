// module
import { Fragment } from 'react';
import { Fetch } from '@/functions/fetch';
// comp
import { Header } from '@/components/primary/header';
// style
import classes from '@/styles/primary/page.module.css';
// types
import { ty_primary_cat_product } from '@/types/primary_page.type';
import { Offer_Products } from '@/components/primary/offer_products';
import { Cat_Product } from '@/components/primary/cat_products';
import { Why_Us } from '@/components/primary/why_us';
import { fetchSummaryData } from '@/apiServer/controller/products/primaryPageSummary';

// =========================== fetch products ===========================
const fetchProducts = async () => {
  try {

    const res = await Fetch<ty_primary_cat_product>({
      url: '/products/primaryPageSummary',
      methodType: 'GET'
    },
    );

    return res;

  }
  catch (err) {
    console.log(err);
    return null;
  }
}

export default async function Home() {

  // const summary_products = await fetchProducts();
  const summary_products = await fetchSummaryData();

  if (!summary_products) {
    return (
      <h1> Internal server error </h1>
    )
  }


  return (
    <Fragment>


      <Header />


      <Cat_Product productList={summary_products}
        section_idx="women_collection"
      />


      <Cat_Product productList={summary_products}
        section_idx="tshirt_collection"
      />


      <Cat_Product productList={summary_products}
        section_idx="fleece_collection"
      />

      {
        summary_products.offerData && summary_products.offerData.length > 0 &&
        <Offer_Products productList={summary_products.offerData} />
      }

      <Why_Us />


    </Fragment>
  )

}