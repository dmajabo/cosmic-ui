import { ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';

export const onValidateGroup = (_s: ISegmentSegmentP): boolean => {
  if (!_s) {
    return false;
  }
  if (!_s.name || !_s.segType) {
    return false;
  }
  return true;
};

export const getMaxCopyValue = (_arr: ISegmentSegmentP[]): number => {
  let num = 1;
  if (!_arr || !_arr.length) {
    return num;
  }
  _arr.forEach(it => {
    const index = it.name.indexOf('copy');
    const number = Number(it.name.substring(index).replace(/[^0-9]/g, ''));
    if (number > num) {
      num = number;
    } else if (number === num) {
      num++;
    }
  });
  return num;
};
