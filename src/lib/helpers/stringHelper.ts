export const capitalizeSubstring = (str: string, count: number) => {
  if (!str || !str.length) return str;
  return str.substring(0, count).toUpperCase() + str.slice(count);
};
