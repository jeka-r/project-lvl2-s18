import _union from 'lodash.union';
import arrayToString from '../src/parsers/arrToStr';


export default (beforeData, afterData) => {
  const keysBeforeData = Object.keys(beforeData);
  const keysAfterData = Object.keys(afterData);
  const unionKeys = _union(keysBeforeData, keysAfterData);
  const result = unionKeys.reduce((acc, item) => {
    const lineA = {};
    if (!afterData[item]) {
      lineA.status = 'removed';
      lineA.key = item;
      lineA.value = beforeData[item];
      return [...acc, lineA];
    }
    if (!beforeData[item]) {
      lineA.status = 'added';
      lineA.key = item;
      lineA.value = afterData[item];
      return [...acc, lineA];
    }
    if (beforeData[item] !== afterData[item]) {
      const lineB = {};
      lineA.status = 'added';
      lineA.key = item;
      lineA.value = afterData[item];
      lineB.status = 'removed';
      lineB.key = item;
      lineB.value = beforeData[item];
      return [...acc, lineA, lineB];
    }
    lineA.status = 'no change';
    lineA.key = item;
    lineA.value = beforeData[item];
    return [...acc, lineA];
  }, []);
  return arrayToString(result);
};
