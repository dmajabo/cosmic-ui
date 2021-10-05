export const isObjectHasField = (data: any, field: string): boolean => {
  return field in data;
};
