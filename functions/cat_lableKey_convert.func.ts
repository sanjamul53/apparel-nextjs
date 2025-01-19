import { specification_labels } from '@/data/product/specification_labels';

export const cat_key_to_label = (key: string|number) => {

  if(specification_labels.hasOwnProperty(`${key}`)) {
    // @ts-ignore
    return specification_labels[key] as string;
  }

  return null;

}