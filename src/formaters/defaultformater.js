import _repeat from 'lodash.repeat';

export default (tree) => {
  const iter = (array, level) => {
    const str = array.reduce((acc, item) => {
      if (item.children.length > 0) {
        return `${acc}    ${item.key}: {\n${iter(item.children, level + 1)}    ${_repeat(' ', 4 * level)}}\n`;
      }

      if (item.status === 'added') {
        if (item.newValue instanceof Object) {
          const objStr = JSON.stringify(item.newValue, ' ', 4).split('\n').join(`\n${_repeat(' ', 4 * (level + 1))}`);
          const valueStr = `${_repeat(' ', 4 * level)}  + ${item.key}: ${objStr}\n`;
          return `${acc}${valueStr}`;
        }
        const newValueStr = `${_repeat(' ', 4 * level)}  + ${item.key}: ${item.newValue}\n`;
        return `${acc}${newValueStr}`;
      }

      if (item.status === 'removed') {
        if (item.oldValue instanceof Object) {
          const objStr = JSON.stringify(item.oldValue, ' ', 4).split('\n').join(`\n${_repeat(' ', 4 * (level + 1))}`);
          const valueStr = `${_repeat(' ', 4 * level)}  - ${item.key}: ${objStr}\n`;
          return `${acc}${valueStr}`;
        }
        const oldValueStr = `${_repeat(' ', 4 * level)}  - ${item.key}: ${item.oldValue}\n`;
        return `${acc}${oldValueStr}`;
      }
      if (item.status === 'updated') {
        const newValueStr = `${_repeat(' ', 4 * level)}  + ${item.key}: ${item.newValue}\n`;
        const oldValueStr = `${_repeat(' ', 4 * level)}  - ${item.key}: ${item.oldValue}\n`;
        return `${acc}${newValueStr}${oldValueStr}`;
      }
      // unit for status `unchanged`
      const valueStr = `${_repeat(' ', 4 * level)}    ${item.key}: ${item.oldValue}\n`;
      return `${acc}${valueStr}`;
    }, '');
    return str;
  };
  return `{\n${iter(tree, 0)}}`;
};
