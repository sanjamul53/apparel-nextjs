type T_param = {
  src: string;
  size?: 'default'| 'lg'| 'md'| 'sm'| 'xs';
}

export const ssactive_img = ({ src, size }: T_param) => {

  let img_src = src;

  if(size === 'lg') {
    img_src = img_src.replace('_fm.', '_fl.');
  }
  else if(size === 'sm') {
    img_src = img_src.replace('_fm.', '_fs.');
  }
  else if(size === 'xs') {
    img_src = img_src.replace('_fm.', '_ft.');
  }

  return `https://cdn.ssactivewear.com/${img_src}`;

}