import _union from 'lodash.union';
import _repeat from 'lodash.repeat';
import getParser from './parsers';
import { getFileData, getType } from './filesystem';

const arrToStr = (arr) => {
  const build = (array, tab) => {
    const str = array.reduce((acc, item) => {
//      console.log('---ITEM--->', item);
      if (item.children) {
        return `${acc}    ${item.key}: {\n${build(item.children, _repeat(tab, 5))}${tab.slice(1)}    }\n`;
      }

      if (item.status === 'changed') {
        const newValueStr = (item.addedValue) ? `${tab.slice(1)}  + ${item.key}: ${item.addedValue}\n` : '';
        const oldValueStr = (item.removedValue) ? `${tab.slice(1)}  - ${item.key}: ${item.removedValue}\n` : '';
        return `${acc}${newValueStr}${oldValueStr}`;
      }

      const valueStr = `${tab.slice(1)}    ${item.key}: ${item.value}\n`;
      return `${acc}${valueStr}`;
    }, '');
    return str;
  };
  return `{\n${build(arr, ' ')}}`;
};

const compare = (preparedDataBefore, preparedDataAfter, acum) => {
  const keysBeforeData = Object.keys(preparedDataBefore);
  const keysAfterData = Object.keys(preparedDataAfter);
  const unionKeys = _union(keysBeforeData, keysAfterData);
  const result = unionKeys.reduce((acc, item) => {
  //  console.log('Bitem--->', item, preparedDataBefore[item]);
  //  console.log('Aitem--->', item, preparedDataAfter[item]);
    if (preparedDataBefore[item] !== preparedDataAfter[item]) {
      if (preparedDataAfter[item] instanceof Object && preparedDataBefore[item] instanceof Object) {
        return [...acc, {
          status: 'no change',
          key: item,
          children: compare(preparedDataBefore[item], preparedDataAfter[item], []),
        }];
      }

      return [...acc, {
        status: 'changed',
        key: item,
        addedValue: preparedDataAfter[item],
        removedValue: preparedDataBefore[item],
      }];
    }

    return [...acc, {
      status: 'no change',
      key: item,
      value: preparedDataBefore[item],
    }];
  }, acum);
//  console.log('---result--->', result);
  return result;
};

export default (pathBefore, pathAfter) => {
  const dataBefore = getFileData(pathBefore);
  const dataAfter = getFileData(pathAfter);
  const type = getType(pathBefore, pathAfter);
  const parser = getParser(type);
  const preparedDataBefore = parser(dataBefore);
  const preparedDataAfter = parser(dataAfter);
  const result = compare(preparedDataBefore, preparedDataAfter, []);
  return arrToStr(result);
};
