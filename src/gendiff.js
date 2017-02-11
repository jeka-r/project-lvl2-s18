import _union from 'lodash.union';
import _repeat from 'lodash.repeat';
import getParser from './parsers';
import { getFileData, getType } from './filesystem';

const arrToStr = (arr) => {
  const build = (array, level) => {
//    console.log('---array--->', array);
    const str = array.reduce((acc, item) => {
//      console.log('---ITEM--->', item);
      if (item.children) {
        return `${acc}    ${item.key}: {\n${build(item.children, level + 1)}    ${_repeat(' ', 4 * level)}}\n`;
      }
      const sign = (item.status === 'added') ? '  + ' : '  - ';

      if (item.value instanceof Object) {
        const objStr = JSON.stringify(item.value, ' ', 4).split('\n').join(`\n${_repeat(' ', 4 * (level + 1))}`);
        const ValueStr = `${_repeat(' ', 4 * level)}${sign}${item.key}: ${objStr}\n`;
        return `${acc}${ValueStr}`;
      }

      if (item.status === 'added' || item.status === 'removed') {
        const newValueStr = `${_repeat(' ', 4 * level)}${sign}${item.key}: ${item.value}\n`;
        return `${acc}${newValueStr}`;
      }
      if (item.status === 'changed') {
        const newValueStr = `${_repeat(' ', 4 * level)}  + ${item.key}: ${item.addedValue}\n`;
        const oldValueStr = `${_repeat(' ', 4 * level)}  - ${item.key}: ${item.removedValue}\n`;
        return `${acc}${newValueStr}${oldValueStr}`;
      }

      const valueStr = `${_repeat(' ', 4 * level)}    ${item.key}: ${item.value}\n`;
      return `${acc}${valueStr}`;
    }, '');
    return str;
  };
  return `{\n${build(arr, 0)}}`;
};

const compare = (preparedDataBefore, preparedDataAfter, acum) => {
  const keysBeforeData = Object.keys(preparedDataBefore);
  const keysAfterData = Object.keys(preparedDataAfter);
  const unionKeys = _union(keysBeforeData, keysAfterData);
  const result = unionKeys.reduce((acc, item) => {
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
          value: preparedDataAfter[item],
        }];
      }
      if (!preparedDataAfter[item]) {
        return [...acc, {
          status: 'removed',
          key: item,
          value: preparedDataBefore[item],
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
  return arrToStr(result);
};
