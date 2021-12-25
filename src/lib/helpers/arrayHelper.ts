export const getChunksFromArray = (items: any[], chunkSize: number) => {
  return [].concat(
    [],
    items.map((elem, i) => (i % chunkSize ? [] : [items.slice(i, i + chunkSize)])),
  );
};
