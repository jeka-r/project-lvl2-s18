export default (arr) => {
  const str = arr.reduce((acc, item) => {
    const keys = Object.keys(item);
    const newAcc = keys.reduce((acum, element) => {
      if (element === 'status') {
        const status = item[element];
        if (status === 'removed') {
          return `${acum}  - `;
        }
        if (status === 'added') {
          return `${acum}  + `;
        }
        return `${acum}    `;
      }
      if (element === 'key') {
        return `${acum}${item[element]}: `;
      }
      return `${acum}${item[element]}`;
    }, acc);
    return `${newAcc}\n`;
  }, '');
  const result = (str.length === 0) ? '{}' : `{\n${str}}`;
  return result;
};
