import _union from 'lodash.union';
import _trimstart from 'lodash.trimstart';
import arrayToString from './parsers/arrToStr';
import jsonToArr from './parsers/jsonToArr';
import ymlToArr from './parsers/ymlToArr';
import { getFileData, getType } from './file-system';

export default (pathBefore, pathAfter) => {
  const dataBefore = getFileData(pathBefore);
  const dataAfter = getFileData(pathAfter);
  const type = _trimstart(getType(pathBefore, pathAfter), '.');
  const parsers = {
    json: jsonToArr,
    yml: ymlToArr,
  };
  const preparedDataBefore = parsers[type](dataBefore);
  const preparedDataAfter = parsers[type](dataAfter);
  const keysBeforeData = Object.keys(preparedDataBefore);
  const keysAfterData = Object.keys(preparedDataAfter);
  const unionKeys = _union(keysBeforeData, keysAfterData);
  const result = unionKeys.reduce((acc, item) => {
    if (!preparedDataAfter[item]) {
      const alfa = {
        status: 'removed',
        key: item,
        value: preparedDataBefore[item],
      };
      return [...acc, alfa];
    }
    if (!preparedDataBefore[item]) {
      const beta = {
        status: 'added',
        key: item,
        value: preparedDataAfter[item],
      };
      return [...acc, beta];
    }
    if (preparedDataBefore[item] !== preparedDataAfter[item]) {
      const gamma = {
        status: 'added',
        key: item,
        value: preparedDataAfter[item],
      };
      const delta = {
        status: 'removed',
        key: item,
        value: preparedDataBefore[item],
      };
      return [...acc, gamma, delta];
    }
    const epsilon = {
      status: 'no change',
      key: item,
      value: preparedDataBefore[item],
    };
    return [...acc, epsilon];
  }, []);
  return arrayToString(result);
};