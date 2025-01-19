import { ty_subCategory } from "@/types/category.type"

interface T_list {
  [key: string]: ty_subCategory[];
}

export const dashobard_subCategory_list: T_list = {

  't_shirt': [

    {
      label: 'Short Sleeves',
      img: '/images/category/t_shirt_short-sleeve.jpg',
      baseCat: 't_shirt',
      sleeve_length: 57
    },
    {
      label: 'Long Sleeves',
      img: '/images/category/t_shirt_long-sleeve.jpg',
      baseCat: 't_shirt',
      sleeve_length: 56
    },
    {
      label: '3/4 Sleeves',
      img: '/images/category/t_shirt_3-4_sleeve.jpg',
      baseCat: 't_shirt',
      sleeve_length: 81
    },
    {
      label: 'Sleeveless',
      img: '/images/category/t_shirt_sleeveless.jpg',
      baseCat: 't_shirt',
      sleeve_length: 63
    }

  ],

  'fleece': [

    {
      label: 'Hooded',
      img: '/images/category/fleece_hooded.jpg',
      baseCat: 'fleece',
      feature: 36
    },
    {
      label: 'Zips',
      img: '/images/category/fleece_zips.jpg',
      baseCat: 'fleece',
      feature: 404
    },
    {
      label: 'Crewneck',
      img: '/images/category/fleece_crewneck.jpg',
      baseCat: 'fleece',
      collar: 8
    },

  ],

  'woven': [
    {
      label: 'Short Sleeves',
      img: '/images/category/woven_short_sleeve.jpg',
      baseCat: 'woven',
      sleeve_length: 57
    },
    {
      label: 'Long Sleeves',
      img: '/images/category/woven_long_sleeve.jpg',
      baseCat: 'woven',
      sleeve_length: 56
    },
  ],

  'sport_shirt': [
    {
      label: 'Short Sleeves',
      img: '/images/category/sport_shirt_short_sleeve.jpg',
      baseCat: 'sport_shirt',
      sleeve_length: 57
    },
    {
      label: 'Long Sleeves',
      img: '/images/category/sport_shirt_long_sleeve.jpg',
      baseCat: 'sport_shirt',
      sleeve_length: 56
    },
  ],

  'activewear': [

    {
      label: 'T-Shirt Activewear',
      img: '/images/category/activewear_t-shirt.jpg',
      baseCat: 't_shirt',
      types: 387
    },
    {
      label: 'Sleeveless Activewear',
      img: '/images/category/activewear_sleeveless.jpg',
      baseCat: 't_shirt',
      sleeve_length: 63,
      types: 387
    },
    {
      label: 'Women Activewear',
      img: '/images/category/activewear_women.jpg',
      baseCat: 't_shirt',
      types: 387,
      fit: 13
    },


    // {
    //   label: 'Short Sleeves T-Shirt',
    //   img: '/images/category/.jpg',
    //   baseCat: 't_shirt',
    //   sleeve_length: 57,
    //   types: 387
    // },
    // {
    //   label: 'Short Sleeves Wovens',
    //   img: '/images/category/.jpg',
    //   baseCat: 'woven',
    //   sleeve_length: 57,
    //   types: 387
    // },
    // {
    //   label: 'Sleeveless T-Shirt',
    //   img: '/images/category/.jpg',
    //   baseCat: 't_shirt',
    //   sleeve_length: 63,
    //   types: 387
    // },
    // {
    //   label: 'Long Sleeves T-Shirt',
    //   img: '/images/category/.jpg',
    //   baseCat: 't_shirt',
    //   sleeve_length: 56,
    //   types: 387
    // },
    // {
    //   label: 'Long Sleeves Wovens',
    //   img: '/images/category/.jpg',
    //   baseCat: 'woven',
    //   sleeve_length: 56,
    //   types: 387
    // }


  ],

  'women': [

    {
      label: 'Women T-Shirts',
      img: '/images/category/women_t-shirt.jpg',
      baseCat: 't_shirt',
      fit: 13
    },
    {
      label: 'Women Fleece',
      img: '/images/category/women_fleece.jpg',
      baseCat: 'fleece',
      fit: 13
    },
    {
      label: 'Women Woven',
      img: '/images/category/women_shirt.jpg',
      baseCat: 'woven',
      fit: 13
    },
    {
      label: 'Women Sport Shirt',
      img: '/images/category/women_sport_shirt.jpg',
      baseCat: 'sport_shirt',
      fit: 13
    }

  ]

}
