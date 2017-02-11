import _repeat from 'lodash.repeat';

const build = (arr) => {
  const arrToStr = (array, level) => {
    const str = array.reduce((acc, item) => {
      if (item.children) {
        return `${acc}    ${item.key}: {\n${arrToStr(item.children, level + 1)}    ${_repeat(' ', 4 * level)}}\n`;
      }
      const sign = (item.status === 'added') ? '  + ' : '  - ';
      if (item.value instanceof Object) {
        const objStr = JSON.stringify(item.value, ' ', 4).split('\n').join(`\n${_repeat(' ', 4 * (level + 1))}`);
        const ValueStr = `${_repeat(' ', 4 * level)}${sign}${item.key}: ${objStr}\n`;
        return `${acc}${ValueStr}`;
      }
      if (item.status === 'added' || item.status === 'removed') {
        const newValueStr = `${_repeat(' ', 4 * level)}${sign}${item.key}: ${item.value}\n`;
        return `${acc}${newValueStr}`;
      }
      if (item.status === 'updated') {
        const newValueStr = `${_repeat(' ', 4 * level)}  + ${item.key}: ${item.addedValue}\n`;
        const oldValueStr = `${_repeat(' ', 4 * level)}  - ${item.key}: ${item.removedValue}\n`;
        return `${acc}${newValueStr}${oldValueStr}`;
      }
      const valueStr = `${_repeat(' ', 4 * level)}    ${item.key}: ${item.value}\n`;
      return `${acc}${valueStr}`;
    }, '');
    return str;
  };
  return `{\n${arrToStr(arr, 0)}}`;
};

const buildPlain = (tree) => {
  const iter = (array, parent) => {
    const str = array.reduce((acc, item) => {
      const dotParent = (parent) ? `${parent}.` : '';
      if (item.children) {
        return [...acc, `${iter(item.children, item.key).join('\n')}`];
      }
      if (item.status === 'removed') {
        return [...acc, `Property '${dotParent}${item.key}' was ${item.status}`];
      }
      if (item.value instanceof Object) {
        return [...acc, `Property '${dotParent}${item.key}' was ${item.status} with complex value`];
      }
      if (item.status === 'added') {
        return [...acc, `Property '${dotParent}${item.key}' was ${item.status} with value: ${item.value}`];
      }
      if (item.status === 'updated') {
        return [...acc, `Property '${dotParent}${item.key}' was ${item.status}. From '${item.removedValue}' to '${item.addedValue}'`];
      }
      return acc;
    }, []);
    return str;
  };
  return iter(tree, '').join('\n');
};

const formats = {
  plain: buildPlain,
  default: build,
};

export default (type) => {
  if (formats[type]) {
    return formats[type];
  }
  return formats.default;
};
