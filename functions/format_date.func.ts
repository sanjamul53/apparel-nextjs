
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const format_date = (strDate: string) => {

  const date = new Date(strDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const dt = date.getDate();

  const second = date.getSeconds();
  const minute = date.getMinutes();
  const hour = date.getHours();

  return {
    year, month: monthNames[month], dt,
    hour, minute, second
  }

}