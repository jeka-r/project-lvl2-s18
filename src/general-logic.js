import ArrayToString from './utils';

export default (beforeData, afterData) => {
  const keysBeforeData = [...beforeData.keys()];
  const interimResult = keysBeforeData.reduce((acc, item) => {
    const lineA = new Map();
    const lineB = new Map();
    if (!afterData.has(item)) {
      lineA.set('status', 'removed');
      lineA.set('key', item);
      lineA.set('value', beforeData.get(item));
      return [...acc, lineA];
    }
    if (beforeData.get(item) !== afterData.get(item)) {
      lineA.set('status', 'added');
      lineA.set('key', item);
      lineA.set('value', afterData.get(item));
      lineB.set('status', 'removed');
      lineB.set('key', item);
      lineB.set('value', beforeData.get(item));
      afterData.delete(item);
      return [...acc, lineA, lineB];
    }
    lineA.set('status', 'no change');
    lineA.set('key', item);
    lineA.set('value', beforeData.get(item));
    afterData.delete(item);
    return [...acc, lineA];
  }, []);

  let finalResult;
  if (afterData.size > 0) {
    const keysAfterData = [...afterData.keys()];
    finalResult = keysAfterData.reduce((acc, item) => {
      const lineA = new Map();
      lineA.set('status', 'added');
      lineA.set('key', item);
      lineA.set('value', afterData.get(item));
      return [...acc, lineA];
    }, interimResult);
  } else {
    finalResult = interimResult;
  }
  return ArrayToString(finalResult);
};
