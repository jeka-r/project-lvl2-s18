import _repeat from 'lodash.repeat';

export default (tree) => {
  const iter = (array, level) => {
    const str = array.reduce((acc, item) => {
      const tab = _repeat(' ', 4 * level);
      const deepTab = _repeat(' ', 4 * (level + 1));
      if (item.children.length > 0) {
        return `${acc}    ${item.key}: {\n${iter(item.children, level + 1)}    ${tab}}\n`;
      }

      if (item.status === 'added') {
        if (item.newValue instanceof Object) {
          const objStr = JSON.stringify(item.newValue, ' ', 4).split('\n').join(`\n${deepTab}`);
          const valueStr = `${tab}  + ${item.key}: ${objStr}\n`;
          return `${acc}${valueStr}`;
        }
        const newValueStr = `${tab}  + ${item.key}: ${item.newValue}\n`;
        return `${acc}${newValueStr}`;
      }

      if (item.status === 'removed') {
        if (item.oldValue instanceof Object) {
          const objStr = JSON.stringify(item.oldValue, ' ', 4).split('\n').join(`\n${deepTab}`);
          const valueStr = `${tab}  - ${item.key}: ${objStr}\n`;
          return `${acc}${valueStr}`;
        }
        const oldValueStr = `${tab}  - ${item.key}: ${item.oldValue}\n`;
        return `${acc}${oldValueStr}`;
      }
      if (item.status === 'updated') {
        const newValueStr = `${tab}  + ${item.key}: ${item.newValue}\n`;
        const oldValueStr = `${tab}  - ${item.key}: ${item.oldValue}\n`;
        return `${acc}${newValueStr}${oldValueStr}`;
      }
      // unit for status `unchanged`
      const valueStr = `${tab}    ${item.key}: ${item.oldValue}\n`;
      return `${acc}${valueStr}`;
    }, '');
    return str;
  };
  return `{\n${iter(tree, 0)}}`;
};
