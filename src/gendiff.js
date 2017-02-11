import _union from 'lodash.union';
import _repeat from 'lodash.repeat';
import getParser from './parsers';
import { getFileData, getType } from './filesystem';

const arrToStr = (arr) => {
  const build = (array, tab) => {
//    console.log('---array--->', array);
    const str = array.reduce((acc, item) => {
//      console.log('---ITEM--->', item);
      if (item.children) {
        return `${acc}    ${item.key}: {\n${build(item.children, _repeat(tab, 5))}${tab.slice(1)}    }\n`;
      }
      if (item.status === 'added') {
        const newValueStr = `${tab.slice(1)}  + ${item.key}: ${item.value}\n`;
        return `${acc}${newValueStr}`;
      }
      if (item.status === 'removed') {
        const oldValueStr = `${tab.slice(1)}  - ${item.key}: ${item.value}\n`;
        return `${acc}${oldValueStr}`;
      }
      if (item.status === 'changed') {
        const newValueStr = `${tab.slice(1)}  + ${item.key}: ${item.addedValue}\n`;
        const oldValueStr = `${tab.slice(1)}  - ${item.key}: ${item.removedValue}\n`;
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
          status: 'unchanged',
          key: item,
          children: compare(preparedDataBefore[item], preparedDataAfter[item], []),
        }];
      }

      if (!preparedDataBefore[item]) {
        return [...acc, {
          status: 'added',
          key: item,
          value: JSON.stringify(preparedDataAfter[item]),
        }];
      }
      if (!preparedDataAfter[item]) {
        return [...acc, {
          status: 'removed',
          key: item,
          value: JSON.stringify(preparedDataBefore[item]),
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
      status: 'unchanged',
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
  const result = compare(preparedDataBefore, preparedDataAfter, []);
//  console.log('---result--->', result);
  return arrToStr(result);
};
