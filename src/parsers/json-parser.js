import diff from '../general-logic';

const set = (acc, key, val) => ({ ...acc, [key]: val });

const stringToAssociativeArray = (str) => {
  const arrayAcc = new Map();
  if (str.length === 0) {
    return arrayAcc;
  }
  const arr = str.replace(/ |{|}|"|\n/g, '').split(',');
  const result = arr.reduce((acc, item) => {
    const tempArr = item.split(':');
    return set(acc, tempArr[0], tempArr[1]);
  }, {});
  return result;
};

export default (before = '', after = '') => {
  const beforeData = stringToAssociativeArray(before);
  const afterData = stringToAssociativeArray(after);

  return diff(beforeData, afterData);
};
