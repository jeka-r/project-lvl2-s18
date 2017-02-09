import _compact from 'lodash.compact';

const set = (acc, key, val) => ({ ...acc, [key]: val });

export default (str) => {
  if (str.length === 0) {
    return {};
  }
  const arr = str.replace(/\n/g, ',').split(',');
  const compactedArr = _compact(arr);
  const result = compactedArr.reduce((acc, item) => {
    const tempArr = item.split('=');
    return set(acc, tempArr[0], tempArr[1]);
  }, {});
  return result;
};
