import { CSSProperties, FC } from 'react';
import { sale_filter_option_list } from '@/app/products/[basecat]/page_data';
import { Radio_Selector } from './radio_selector';
import { specifications_categorized } from '@/data/product/specifications_categorized';
// style
import classes from '@/styles/products/basecat/dynamic_navbar/dynamic_navbar.module.css';
// types
import { ty_page_params } from '@/types/general.type';
import { ty_product_filter_data_list } from '@/types/products.type';
import { Selected_Params } from './selected_params';

interface IComp {
  params: ty_page_params;
  filter_data: ty_product_filter_data_list | null;
}


export const Dynamic_Navbar: FC<IComp> = ({ params, filter_data }) => {

  if (!filter_data) return null;

  // get types
  const type_list = filter_data.sub_list.filter(el => {
    if (specifications_categorized.types.includes(`${el._id}`)) {
      return el;
    }
  });

  // get sleeve_length
  const sleeve_length_list = filter_data.sub_list.filter(el => {
    if (specifications_categorized.sleeve_length.includes(`${el._id}`)) {
      return el;
    }
  });

  // get feature
  const feature_list = filter_data.sub_list.filter(el => {
    if (specifications_categorized.feature.includes(`${el._id}`)) {
      return el;
    }
  });

  // get fit
  const fit_list = filter_data.sub_list.filter(el => {
    if (specifications_categorized.fit.includes(`${el._id}`)) {
      return el;
    }
  });

  // get collar
  const collar_list = filter_data.sub_list.filter(el => {
    if (specifications_categorized.collar.includes(`${el._id}`)) {
      return el;
    }
  });

  // get thickness
  const thickness_list = filter_data.sub_list.filter(el => {
    if (specifications_categorized.thickness.includes(`${el._id}`)) {
      return el;
    }
  });


  return (
    <div className={classes.root}>

      <Selected_Params params={params} />

      {
        // ======================= sizes =======================
        filter_data.sizes.length > 0 &&
        <Radio_Selector
          params={params}
          param_name="size"
          title="Sizes"
          option_list={filter_data.sizes}
        />
      }

      {
        // ======================= brands =======================
        filter_data.brand.length > 0 &&
        <Radio_Selector
          params={params}
          param_name="brand"
          title="Brands"
          option_list={filter_data.brand}
        />
      }


      {/* ======================= sale/ offer ======================= */}
      <Radio_Selector
        params={params}
        param_name="sale"
        title="Sale Type"
        option_list={sale_filter_option_list}
        default_optionId="all"
      />


      {
        // ======================= types =======================
        type_list.length > 0 &&
        <Radio_Selector
          params={params}
          param_name="type"
          title="Types"
          option_list={type_list}
          is_specification={true}
          init_open={true}
        />
      }

      {
        // ======================= sleeve length =======================
        sleeve_length_list.length > 0 &&
        <Radio_Selector
          params={params}
          param_name="sleeve_length"
          title="Sleeve Length"
          option_list={sleeve_length_list}
          is_specification={true}
          init_open={true}
        />
      }

      {
        // ======================= feature list =======================
        feature_list.length > 0 &&
        <Radio_Selector
          params={params}
          param_name="feature"
          title="Features"
          option_list={feature_list}
          is_specification={true}
          init_open={true}
        />
      }

      {
        // ======================= fit list =======================
        fit_list.length > 0 &&
        <Radio_Selector
          params={params}
          param_name="fit"
          title="Fits"
          option_list={fit_list}
          is_specification={true}
          init_open={true}
        />
      }

      {
        // ======================= collar list =======================
        collar_list.length > 0 &&
        <Radio_Selector
          params={params}
          param_name="collar"
          title="Collars"
          option_list={collar_list}
          is_specification={true}
          init_open={true}
        />
      }

      {
        // ======================= thickness list =======================
        thickness_list.length > 0 &&
        <Radio_Selector
          params={params}
          param_name="thickness"
          title="Thickness"
          option_list={thickness_list}
          is_specification={true}
          init_open={true}
        />
      }



    </div>
  )

};