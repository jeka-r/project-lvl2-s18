import _repeat from 'lodash.repeat';

const build = (arr) => {
  const arrToStr = (array, level) => {
    const str = array.reduce((acc, item) => {
      if (item.children.length > 0) {
        return `${acc}    ${item.key}: {\n${arrToStr(item.children, level + 1)}    ${_repeat(' ', 4 * level)}}\n`;
      }

      if (item.status === 'added') {
        if (item.newValue instanceof Object) {
          const objStr = JSON.stringify(item.newValue, ' ', 4).split('\n').join(`\n${_repeat(' ', 4 * (level + 1))}`);
          const ValueStr = `${_repeat(' ', 4 * level)}  + ${item.key}: ${objStr}\n`;
          return `${acc}${ValueStr}`;
        }
        const newValueStr = `${_repeat(' ', 4 * level)}  + ${item.key}: ${item.newValue}\n`;
        return `${acc}${newValueStr}`;
      }

      if (item.status === 'removed') {
        if (item.oldValue instanceof Object) {
          const objStr = JSON.stringify(item.oldValue, ' ', 4).split('\n').join(`\n${_repeat(' ', 4 * (level + 1))}`);
          const ValueStr = `${_repeat(' ', 4 * level)}  - ${item.key}: ${objStr}\n`;
          return `${acc}${ValueStr}`;
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
  return `{\n${arrToStr(arr, 0)}}`;
};

const buildPlain = (tree) => {
  const iter = (array, parent) => {
    const str = array.reduce((acc, item) => {
      const dotParent = (parent) ? `${parent}.` : '';
      if (item.children.length > 0) {
        return [...acc, `${iter(item.children, item.key).join('\n')}`];
      }
      if (item.status === 'removed') {
        return [...acc, `Property '${dotParent}${item.key}' was ${item.status}`];
      }
      if (item.newValue instanceof Object) {
        return [...acc, `Property '${dotParent}${item.key}' was ${item.status} with complex value`];
      }
      if (item.status === 'added') {
        return [...acc, `Property '${dotParent}${item.key}' was ${item.status} with value: ${item.newValue}`];
      }
      if (item.status === 'updated') {
        return [...acc, `Property '${dotParent}${item.key}' was ${item.status}. From '${item.oldValue}' to '${item.newValue}'`];
      }
      return acc;
    }, []);
    return str;
  };
  return iter(tree, '').join('\n');
};

const buildJson = data => JSON.stringify(data, null, 2);

const formats = {
  plain: buildPlain,
  json: buildJson,
  default: build,
};

export default (type) => {
  if (formats[type]) {
    return formats[type];
  }
  return formats.default;
};
