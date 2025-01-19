export const is_object = (val: any) => {

  if (
    typeof val === 'object' &&
    !Array.isArray(val) &&
    val !== null
  ) {
    return true;
  }

  return false;

}