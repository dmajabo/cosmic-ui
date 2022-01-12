export const capitalizeFirstLetter = (str: string) => {
  if (!str || !str.length) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};
