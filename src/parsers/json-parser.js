import diff from '../general-logic';

const stringToAssociativeArray = (str) => {
  const arrayAcc = new Map();
  if (str.length === 0) {
    return arrayAcc;
  }
  const arr = str.replace(/ |{|}|"|\n/g, '').split(',');
  const result = arr.reduce((acc, item) => {
    const tempArr = item.split(':');
    acc.set(tempArr[0], tempArr[1]);
    return acc;
  }, arrayAcc);
  return result;
};

export default (before = '', after = '') => {
  const beforeData = stringToAssociativeArray(before);
  const afterData = stringToAssociativeArray(after);

  return diff(beforeData, afterData);
};
