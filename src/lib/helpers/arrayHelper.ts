export const getChunksFromArray = (items: any[], chunkSize: number) => {
  const _arr = [];
  for (let i = 0, j = items.length; i < j; i += chunkSize) {
    const temporary = items.slice(i, i + chunkSize);
    _arr.push(temporary);
  }
  // return items.reduce((resultArray, item, index) => {
  //   const chunkIndex = Math.floor(index / chunkSize);

  //   if (!resultArray[chunkIndex]) {
  //     resultArray[chunkIndex] = []; // start a new chunk
  //   }

  //   resultArray[chunkIndex].push(item);

  //   return resultArray;
  // }, []);
  return _arr;
};
