import _union from 'lodash.union';
import getParser from './parsers';
import { getFileData, getType } from './filesystem';

const arrToStr = (arr) => {
  const str = arr.reduce((acc, item) => {
    const keys = Object.keys(item);
    const newAcc = keys.reduce((acum, element) => {
      if (element === 'status') {
        const status = item[element];
        if (status === 'removed') {
          return `${acum}  - `;
        }
        if (status === 'added') {
          return `${acum}  + `;
        }
        return `${acum}    `;
      }
      if (element === 'key') {
        return `${acum}${item[element]}: `;
      }
      return `${acum}${item[element]}`;
    }, acc);
    return `${newAcc}\n`;
  }, '');
  return (str.length === 0) ? '{}' : `{\n${str}}`;
};

export default (pathBefore, pathAfter) => {
  const dataBefore = getFileData(pathBefore);
  const dataAfter = getFileData(pathAfter);

  const type = getType(pathBefore, pathAfter);

  const parser = getParser(type);

  const preparedDataBefore = parser(dataBefore);
  const preparedDataAfter = parser(dataAfter);

  const keysBeforeData = Object.keys(preparedDataBefore);
  const keysAfterData = Object.keys(preparedDataAfter);

  const unionKeys = _union(keysBeforeData, keysAfterData);

  const result = unionKeys.reduce((acc, item) => {
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
  }, []);
  return arrToStr(result);
};
