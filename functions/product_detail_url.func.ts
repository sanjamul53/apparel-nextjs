type T_param = {
  id: string;
  name: string;
}

export const product_detail_url_generator = ({ id, name }: T_param) => {

  let name_str = name.split(' ').join('-').toLowerCase();
  name_str = name_str.replace(/[\/\\]/g, '_');

  return `/product/${id}/${name_str}`;

}