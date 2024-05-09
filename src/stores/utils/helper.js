const addZero = (d) => d < 10 ? `0${d}` : d;

export const convertDate = (d) => {
  let date = new Date(d);
  return `${addZero(date.getDay())}-${addZero(date.getMonth() + 1)}-${date.getFullYear()}`
}