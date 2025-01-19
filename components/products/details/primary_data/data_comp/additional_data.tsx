import { useState } from 'react';
import { Accordion } from '@/components/shared/accordion';
import classes from 
'@/styles/products/details/primary_data/data_comp/additional_data.module.css'
import { Typo } from '@/components/shared/typography';


type T_productData = { title: string; value: string; }

const productData: T_productData[] = [
  {
    title: 'FIT',
    value: 'Fit: Shift – fits straight and relaxed'
  },
  {
    title: 'LENGTH',
    value: '31" from shoulder to hem, measured from a size 8/M'
  },
  {
    title: 'FABRIC',
    value: 'Fabric: Soft knit'
  },
  {
    title: 'FABRIC & CARE',
    value: '57% Acrylic, 38% Rayon, 5% Spandex Machine Washable Imported'
  },
  {
    title: 'HIT',
    value: 'Hit: Mini - Hits above the knee'
  },
  {
    title: 'STYLE #',
    value: '766426'
  }
]

export const Additional_Data = () => {

  return (
    <div className={classes.root}>

      <Accordion title="Product Details"
        defaultOpen={true}
      >

        <div className={classes.data_content}>

          <Typo
            txt="Flowing from a flattering square neck with romantic blouson sleeves, this deceptively comfy and easy-going dress is a love-forever dream. Square neck and back. Long sleeves with elasticized puff shoulders and button cuffs."
          />

          <table className={classes.data_table}>
            <tbody>
            {
              productData.map((el, idx) => (
                <tr key={idx} className={classes.data_table_row}>

                  <td className={classes.row_key}>
                    {el.title}
                  </td>

                  <td className={classes.row_value}>
                    {el.value}
                  </td>

                </tr>
              ))
            }
            </tbody>
          </table>


        </div>

      </Accordion>

      <Accordion title="Shipping & Returns"
        Sx={{marginTop: '2rem'}}
      >
        <Typo txt="Estimated Delivery by Standard Shipping:" />
        <Typo txt="Within 7 to 15 days after ordering the product." margin="1rem 0" />
        <Typo txt="Learn more about our shipping and returns policy." />
      </Accordion>


    </div>
  )

};