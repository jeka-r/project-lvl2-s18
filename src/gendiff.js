import _union from 'lodash.union';
import getParser from './parsers';
import getFormatedData from './outputformats';
import { getFileData, getType } from './filesystem';

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
          newValue: null,
          oldValue: null,
          children: compare(preparedDataBefore[item], preparedDataAfter[item], []),
        }];
      }

      if (!preparedDataBefore[item]) {
        return [...acc, {
          status: 'added',
          key: item,
          newValue: preparedDataAfter[item],
          oldValue: null,
          children: [],
        }];
      }
      if (!preparedDataAfter[item]) {
        return [...acc, {
          status: 'removed',
          key: item,
          newValue: null,
          oldValue: preparedDataBefore[item],
          children: [],
        }];
      }
      return [...acc, {
        status: 'updated',
        key: item,
        newValue: preparedDataAfter[item],
        oldValue: preparedDataBefore[item],
        children: [],
      }];
    }

    return [...acc, {
      status: 'unchanged',
      key: item,
      newValue: null,
      oldValue: preparedDataBefore[item],
      children: [],
    }];
  }, acum);
  return result;
};

export default (pathBefore, pathAfter, outputFormat) => {
  const dataBefore = getFileData(pathBefore);
  const dataAfter = getFileData(pathAfter);
  const type = getType(pathBefore, pathAfter);
  const parser = getParser(type);
  const preparedDataBefore = parser(dataBefore);
  const preparedDataAfter = parser(dataAfter);
  const comaparedData = compare(preparedDataBefore, preparedDataAfter, []);
  const result = getFormatedData(comaparedData, outputFormat);
  return result;
};
