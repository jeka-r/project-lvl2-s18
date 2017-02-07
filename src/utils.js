export function stringToAssociativeArray(str) {
  const arrayAcc = new Map();
  if (str.length === 0) {
    return arrayAcc;
  }
  const arr = str.replace(/ |{|}|"|\n/g, '').split(',');

  return arr.reduce((acc, item) => {
    const tempArr = item.split(':');
    acc.set(tempArr[0], tempArr[1]);
    return acc;
  }, arrayAcc);
}

export function associativeArrayToString(arr) {
  const keys = [...arr.keys()];

  const str = keys.reduce((acc, item) => {
    const newAcc = `${acc}${item}: ${arr.get(item)}\n`;
    return newAcc;
  }, '');

  return `{\n${str}}`;
}
