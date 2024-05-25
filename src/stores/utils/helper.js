const addZero = (d) => d < 10 ? `0${d}` : d;

export const convertDate = (d, type) => {
  let date = new Date(d);
  return type == 'full' ? `${addZero(date.getDay())}-${addZero(date.getMonth() + 1)}-${date.getFullYear()} | ${addZero(date.getHours())}:${addZero(date.getMinutes())}`
    : `${addZero(date.getDay())}-${addZero(date.getMonth() + 1)}-${date.getFullYear()}`
}