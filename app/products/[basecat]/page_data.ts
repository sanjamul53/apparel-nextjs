import { ty_product_filter_data_item, ty_product_query_param } 
from '@/types/products.type';


export const Product_SORT_PARAM = 'sort';
export const Product_PAGE_PARAM = 'page';

export const sale_filter_option_list: ty_product_filter_data_item[] = [
  { _id: 'all', label: 'All' },
  { _id: 'only_sale', label: 'Only Sale' },
  { _id: 'without_sale', label: 'Without Sale' },
]

export const accepted_params_filter: ty_product_query_param[] = [
  'brand', 'sleeve_length', 'feature', 'collar', 'fit', 'thickness',
  'color', 'size', 'type', 'sale'
];