import { is_integer } from "./is_integer.func";

type T_param = {
  num: number;
  percentage: number;
}

export const calculate_percentage = ({ num, percentage }: T_param) => {

  const offer_num = (num*percentage) / 100;

  const clc_num = num - offer_num;

  if(is_integer(clc_num)) return clc_num;

  return Number(clc_num.toFixed(2));

}