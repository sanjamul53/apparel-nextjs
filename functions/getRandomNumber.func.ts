type T_param = {
  min: number;
  max: number;
  float?: boolean;
}

export const getRandomNumber = ({min, max, float}: T_param) => {

  let difference = max - min;

  if(float !== true) { // number is integer
    difference = difference + 1;
  }

  let rand = Math.random();

  rand = rand * difference;

  if(float !== true) { // number is integer
    rand = Math.floor(rand);
  }

  rand = rand + min;

  return rand;

}