import { Dashboard_navigation_item } from "../navigation";

type T_queryItem_api = {
  baseCategory: string | null;
  sub_list: number | null;
  section_idx: string;
}

type T_item = {
  title: string;
  img: string;
  href: string;
}

export type ty_primary_byCategory_item = {
  title: string;
  subtitle: string;
  href: string | null;

  subCatList: T_item[];
}

interface T_list {

  [section_idx: string]: ty_primary_byCategory_item

}

export const dashboard_primary_byCategory_query_items: T_list = {


  // ========================== T-Shirt collection =======================
  'tshirt_collection': {

    title: 'T-Shirt Collection',
    subtitle: 'Discover more gift ideas than ever before.',
    href: `${Dashboard_navigation_item.products}/t_shirt`,

    subCatList: [
      {
        title: 'Short Sleeves',
        img: '/images/primary/cat_products/tshirt_shortSleeve.jpg',
        href: `${Dashboard_navigation_item.products}/t_shirt?sleeve_length=57`
      },
      {
        title: '3/4 Sleeves',
        img: '/images/primary/cat_products/tshirt_3-4Sleeve.jpg',
        href: `${Dashboard_navigation_item.products}/t_shirt?sleeve_length=81`
      },
      {
        title: 'Long Sleeves',
        img: '/images/primary/cat_products/tshirt_longSleeve.jpg',
        href: `${Dashboard_navigation_item.products}/t_shirt?sleeve_length=56`
      },
      {
        title: 'Sleeveless',
        img: '/images/primary/cat_products/tshirt_sleeveless.jpg',
        href: `${Dashboard_navigation_item.products}/t_shirt?sleeve_length=63`
      },
      {
        title: 'Kids T-Shirt',
        img: '/images/primary/cat_products/tshirt_kid.jpg',
        href: `${Dashboard_navigation_item.products}/t_shirt?fit=12`
      }
    ]

  },


  // ========================== Fleece collection =======================
  'fleece_collection': {

    title: 'Fleece Collection',
    subtitle: 'Discover more gift ideas than ever before.',
    href: null,

    subCatList: [
      {
        title: 'Zip Jacket',
        img: '/images/primary/cat_products/fleece_zip.jpg',
        href: `${Dashboard_navigation_item.products}/fleece?feature=404`
      },
      {
        title: 'Crewneck Fleece',
        img: '/images/primary/cat_products/fleece_crewneck.jpg',
        href: `${Dashboard_navigation_item.products}/fleece?collar=8`
      },
      {
        title: 'Hodded Jacket',
        img: '/images/primary/cat_products/fleece_hooded.jpg',
        href: `${Dashboard_navigation_item.products}/fleece?feature=36`
      },
      {
        title: 'Activewear Fleece',
        img: '/images/primary/cat_products/fleece_activewear.jpg',
        href: `${Dashboard_navigation_item.products}/fleece?type=387`
      },
      {
        title: 'Kids Jacket',
        img: '/images/primary/cat_products/fleece_kid.jpg',
        href: `${Dashboard_navigation_item.products}/fleece?fit=12`
      }
    ]

  },

  // ========================== women collection =======================
  'women_collection': {

    title: 'Women Collection',
    subtitle: 'Discover more gift ideas than ever before.',
    href: null,

    subCatList: [
      {
        title: 'Tops & T-Shirt',
        img: '/images/primary/cat_products/women_tshirt.jpg',
        href: `${Dashboard_navigation_item.products}/t_shirt?fit=13`
      },
      {
        title: 'Fleece Jacket',
        img: '/images/primary/cat_products/women_sleeve.jpg',
        href: `${Dashboard_navigation_item.products}/fleece?fit=13`
      },
      {
        title: 'Women Shirt',
        img: '/images/primary/cat_products/women_shirt.jpg',
        href: `${Dashboard_navigation_item.products}/woven?fit=13`
      },
      {
        title: 'Sport Dress',
        img: '/images/primary/cat_products/women_sport_tshirt.jpg',
        href: `${Dashboard_navigation_item.products}/sport_shirt?fit=13`
      },
      {
        title: 'Women Activewear',
        img: '/images/primary/cat_products/women_activewear.jpg',
        href: `${Dashboard_navigation_item.products}/t_shirt?type=387&fit=13`
      }
    ]

  }

}


export const dashboard_api_primary_byCategory_query_item: T_queryItem_api[] = [

  {
    baseCategory: 't_shirt',
    sub_list: null,
    section_idx: 'tshirt_collection',
  },
  {
    baseCategory: 'fleece',
    sub_list: null,
    section_idx: 'fleece_collection',
  },
  {
    baseCategory: null,
    sub_list: 13,
    section_idx: 'women_collection',
  }

]