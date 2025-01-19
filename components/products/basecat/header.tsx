// module
import { FC, Dispatch, SetStateAction } from 'react';
import { useSetURL } from '@/hooks/useSetURL';
// functions
import { Product_PAGE_PARAM, Product_SORT_PARAM } from 
'@/app/products/[basecat]/page_data';
import { cat_key_to_label } from '@/functions/cat_lableKey_convert.func';
// comp
import { Page_Header } from '@/components/shared/page_header';
import { Dropdown, ty_dropdown_data_item } from '@/components/shared/dropdown';
import { Typo } from '@/components/shared/typography';
// icons
import { Icon_Filter } from '@/components/icons/filter';
import { Icon_Arrow_Left } from '@/components/icons/arrow_left';
import { Icon_Arrow_Right } from '@/components/icons/arrow_right';
// style
import classes from '@/styles/products/basecat/header.module.css';
import { ty_page_params } from '@/types/general.type';
import { is_integer } from '@/functions/is_integer.func';
import { ty_product_filter_data_additonal } from '@/types/products.type';
import { IconButton } from '@/components/shared/button/icon_button';
import { product_paginate_doc_count } from '@/data/api_data';

interface IComp {
  basecat: string;
  setMenu_isOpen: Dispatch<SetStateAction<boolean>>;
  searchParams: ty_page_params;
  additional_data: ty_product_filter_data_additonal|null;
}

const sort_by_list: ty_dropdown_data_item[] = [
  { label: 'Default', value: 'default' },
  { label: 'Popularity', value: 'popularity' },
  { label: 'Price: Low > High', value: 'price_asc' },
  { label: 'Price: High > To', value: 'price_desc' },
];


export const Product_basecat_header: FC<IComp> = ({ 
  setMenu_isOpen, searchParams, basecat, additional_data 
}) => {

  const { set_param } = useSetURL();

  let sortBy = sort_by_list[0];
  let currentPage = 1;
  let totalPage: null|number = null;

  const basecatName = cat_key_to_label(basecat);
  const basecatLabel = basecatName ? basecatName: basecat;
  
  // ================== handle sort parameter ==================
  if(
    searchParams.hasOwnProperty(Product_SORT_PARAM) && 
    typeof searchParams[Product_SORT_PARAM] === 'string'
  ) {

    const currentSort = sort_by_list.find(el => {
      if(el.value === searchParams[Product_SORT_PARAM]) return true;
    });

    if(currentSort) {
      sortBy = {...currentSort};
    }
    
  }

  const handle_sortBy = (item: ty_dropdown_data_item) => {
    set_param({
      name: Product_SORT_PARAM,
      value: item.value
    })
  }

  // ================== handle page parameter ==================
  if(
    searchParams.hasOwnProperty(Product_PAGE_PARAM) && 
    typeof searchParams[Product_PAGE_PARAM] === 'string' &&
    is_integer(searchParams[Product_PAGE_PARAM])
  ) {
    currentPage = Number(searchParams[Product_PAGE_PARAM])
  }

  if(additional_data) {
    totalPage = Math.ceil(
      additional_data.total/product_paginate_doc_count
    );
  }

  const page_decrease_handler = () => {
    if(currentPage <= 1 ) return null;

    set_param({ 
       name: Product_PAGE_PARAM,
       value: currentPage-1
    })

  }


  const page_increase_handler = () => {
    if( totalPage && currentPage >= totalPage ) return null;

    set_param({ 
       name: Product_PAGE_PARAM,
       value: currentPage+1
    })

  }




  return (
    <Page_Header 
      title={`${basecatLabel} Products`}
      nav_list={[ 
        {label: 'Shop', link: '/products'},
        {label: basecatLabel, link: null},
      ]}
      section_cls={classes.header_root}
    >

      <div className={classes.content}>


        {/* ======================= icon menu container ======================= */}
        <div className={classes.nav_menu_container}>

          <IconButton
            onClick={() => setMenu_isOpen(true)}
          >
            <Icon_Filter 
              fill="var(--color_white)"
              Sx={{ transform: 'rotate(90deg) scale(0.9)' }}
            />
          </IconButton>

        </div>


        {/* ======================= sort container ======================= */}
        <div className={classes.sort_container}>

          <Dropdown
            label="Sort by"
            list={sort_by_list}
            currentValue={sortBy}
            setCurrentValue={handle_sortBy}
            label_is_outside={true}
            label_color="var(--color_white)"
          />

        </div>

        {/* ======================= paginate container ======================= */}
        <div className={classes.paginate_container_div}>

          <div className={classes.paginate_container}>

            <IconButton onClick={page_decrease_handler} >
              <Icon_Arrow_Left fill="var(--color_white)" scale={0.6} />
            </IconButton>

            <div  className={classes.paginate_numbers}>

              <Typo
                txt={currentPage}
                size="1.6rem"
                color="var(--color_white)"
                margin="0"
              />

              <Typo
                txt="/"
                size="1.6rem"
                color="var(--color_white)"
                margin="0 0.5rem"
              />

              <Typo
                txt={totalPage||'...'}
                size="1.6rem"
                color="var(--color_white)"
                margin="0"
              />

            </div>

            <IconButton onClick={page_increase_handler} >
              <Icon_Arrow_Right fill="var(--color_white)" scale={0.6} />
            </IconButton>

          </div>


          <Typo
            txt={
              additional_data ? `of ${additional_data.total} products`: 
              'of ... products'
            }
            color="var(--color_white)"
            margin="0 0 0 1rem"
          />


        </div>



      </div>

      

    </Page_Header>
  )

};