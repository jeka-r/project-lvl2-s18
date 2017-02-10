import _union from 'lodash.union';
import _repeat from 'lodash.repeat';
import getParser from './parsers';
import { getFileData, getType } from './filesystem';

const arrToStr = (arr1) => {
  const b = (arr, tab) => {
    const str = arr.reduce((acc, item) => {
      const keys = Object.keys(item);
      const newAcc = keys.reduce((acum, element) => {
        if (element === 'status') {
          const status = item[element];
          if (status === 'removed') {
            return `${acum}${tab.slice(1)}  - `;
          }
          if (status === 'added') {
            return `${acum}${tab.slice(1)}  + `;
          }
          return `${acum}${tab.slice(1)}    `;
        }
        if (element === 'key') {
          return `${acum}${item[element]}: `;
        }
        if (element === 'value' && item[element] instanceof Array) {
          return `${acum}{\n${b(item[element], _repeat(tab, tab.length + 4))}    ${tab.slice(1)}}`;
        }
        return `${acum}${item[element]}`;
      }, acc);
      return `${newAcc}\n`;
    }, '');
    return str;
  };
  const a = b(arr1, ' ');
  return (a.length === 0) ? '{}' : `{\n${a}}`;
};

// const replace = (key, value) => {
//  if (typeof value === 'string') {
//    console.log('IF---key--->', key);
//    console.log('IF---value--->', value);
//    return value;
//  }
//  console.log('---key--->', value);
//  console.log('---value--->', value);
//  return value.toString();
// };

const compare = (preparedDataBefore, preparedDataAfter, acum) => {
  const keysBeforeData = Object.keys(preparedDataBefore);
  const keysAfterData = Object.keys(preparedDataAfter);
  const unionKeys = _union(keysBeforeData, keysAfterData);
  const result = unionKeys.reduce((acc, item) => {
    if (preparedDataBefore[item] instanceof Object && !preparedDataAfter[item]) {
      return [...acc, {
        status: 'removed',
        key: item,
        value: JSON.stringify(preparedDataBefore[item]),
      }];
    }
    if (preparedDataAfter[item] instanceof Object && !preparedDataBefore[item]) {
      return [...acc, {
        status: 'added',
        key: item,
        value: JSON.stringify(preparedDataAfter[item]),
      }];
    }
    if (preparedDataAfter[item] instanceof Object && preparedDataBefore[item] instanceof Object) {
      return [...acc, {
        status: 'no change',
        key: item,
        value: compare(preparedDataBefore[item], preparedDataAfter[item], []),
      }];
    }
    if (!preparedDataAfter[item]) {
      return [...acc, {
        status: 'removed',
        key: item,
        value: preparedDataBefore[item],
      }];
    }
    if (!preparedDataBefore[item]) {
      return [...acc, {
        status: 'added',
        key: item,
        value: preparedDataAfter[item],
      }];
    }
    if (preparedDataBefore[item] !== preparedDataAfter[item]) {
      return [...acc, {
        status: 'added',
        key: item,
        value: preparedDataAfter[item],
      }, {
        status: 'removed',
        key: item,
        value: preparedDataBefore[item],
      }];
    }
    return [...acc, {
      status: 'no change',
      key: item,
      value: preparedDataBefore[item],
    }];
  }, acum);
  return result;
};

export default (pathBefore, pathAfter) => {
  const dataBefore = getFileData(pathBefore);
  const dataAfter = getFileData(pathAfter);
  const type = getType(pathBefore, pathAfter);
  const parser = getParser(type);
  const preparedDataBefore = parser(dataBefore);
  const preparedDataAfter = parser(dataAfter);
  console.log('preparedDataBefore---->', preparedDataBefore);

  const result = compare(preparedDataBefore, preparedDataAfter, []);
  return arrToStr(result);
};
