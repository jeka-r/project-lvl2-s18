export default (arr) => {
  const str = arr.reduce((acc, item) => {
    const keys = [...item.keys()];
    const newAcc = keys.reduce((acum, element) => {
      if (element === 'status') {
        const status = item.get(element);
        if (status === 'removed') {
          return `${acum}  - `;
        }
        if (status === 'added') {
          return `${acum}  + `;
        }
        return `${acum}    `;
      }
      if (element === 'key') {
        return `${acum}${item.get(element)}: `;
      }
      return `${acum}${item.get(element)}`;
    }, acc);
    return `${newAcc}\n`;
  }, '');
  const result = (str.length === 0) ? '{}' : `{\n${str}}`;
  return result;
};
