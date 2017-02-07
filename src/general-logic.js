import { stringToAssociativeArray, associativeArrayToString } from './utils';

export default (before = '', after = '') => {
  const arrAcc = new Map();
  const beforeData = stringToAssociativeArray(before);
  const afterData = stringToAssociativeArray(after);
  const keysBeforeData = [...beforeData.keys()];

  const interimResult = keysBeforeData.reduce((acc, item) => {
    if (!afterData.has(item)) {
      acc.set(`  - ${item}`, beforeData.get(item));
      return acc;
    }
    if (beforeData.get(item) !== afterData.get(item)) {
      acc.set(`  + ${item}`, afterData.get(item));
      acc.set(`  - ${item}`, beforeData.get(item));
      afterData.delete(item);
      return acc;
    }
    acc.set(`    ${item}`, beforeData.get(item));
    afterData.delete(item);
    return acc;
  }, arrAcc);

  let finalResult;
  if (afterData.size > 0) {
    const keysAfterData = [...afterData.keys()];
    finalResult = keysAfterData.reduce((acc, item) => {
      acc.set(`  + ${item}`, afterData.get(item));
      return acc;
    }, interimResult);
  } else {
    finalResult = interimResult;
  }
  return associativeArrayToString(finalResult);
};
