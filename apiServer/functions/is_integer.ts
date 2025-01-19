export const is_integer = (value?: number | string): boolean => {

  if (
    value === null || typeof value === 'undefined'
  ) {
    return false;
  }

  if (
    typeof value === 'number' ||
    typeof value === 'string'
  ) {

    if (
      isNaN(parseFloat(value.toString())) ||
      isNaN(Number(value))
    ) {
      return false;
    }

    const remainder = (Number(value) % 1);
    if (remainder === 0) {
      return true;
    }
  }
  return false;
}