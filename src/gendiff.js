import _union from 'lodash.union';
import getParser from './parsers';
import getFormater from './formaters';
import { getFileData, getFileExtension } from './filesystem';

const compare = (preparedDataBefore, preparedDataAfter, acum) => {
  const keysBeforeData = Object.keys(preparedDataBefore);
  const keysAfterData = Object.keys(preparedDataAfter);
  const unionKeys = _union(keysBeforeData, keysAfterData);
  const astTree = unionKeys.reduce((acc, item) => {
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
  return astTree;
};

export default (pathBefore, pathAfter, outputFormat) => {
  const dataBefore = getFileData(pathBefore);
  const dataAfter = getFileData(pathAfter);
  const fileExtension = getFileExtension(pathBefore, pathAfter);
  const parse = getParser(fileExtension);
  const preparedDataBefore = parse(dataBefore);
  const preparedDataAfter = parse(dataAfter);
  const comparedData = compare(preparedDataBefore, preparedDataAfter, []);
  const formate = getFormater(outputFormat);
  const result = formate(comparedData);
  return result;
};
