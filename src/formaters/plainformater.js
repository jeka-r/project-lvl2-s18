export default (tree) => {
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
