import _union from 'lodash.union';
import getParser from './parsers';
import getOutputFormat from './outputformats';
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
        status: 'updated',
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

export default (pathBefore, pathAfter, outputFormat) => {
  const dataBefore = getFileData(pathBefore);
  const dataAfter = getFileData(pathAfter);
  const type = getType(pathBefore, pathAfter);
  const parser = getParser(type);
  const preparedDataBefore = parser(dataBefore);
  const preparedDataAfter = parser(dataAfter);
  const result = compare(preparedDataBefore, preparedDataAfter, []);
  const format = getOutputFormat(outputFormat);
  return format(result);
};
