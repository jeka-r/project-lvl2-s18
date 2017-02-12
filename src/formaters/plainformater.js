export default (tree) => {
  const iter = (array, parent) => {
    const str = array.reduce((acc, item) => {
      if (item.children.length > 0) {
        return [...acc, `${iter(item.children, item.key).join('\n')}`];
      }
      const dotParent = (parent) ? `${parent}.` : '';
      const generalString = `Property '${dotParent}${item.key}' was ${item.status}`;
      if (item.status === 'removed') {
        return [...acc, `${generalString}`];
      }
      if (item.newValue instanceof Object) {
        return [...acc, `${generalString} with complex value`];
      }
      if (item.status === 'added') {
        return [...acc, `${generalString} with value: ${item.newValue}`];
      }
      if (item.status === 'updated') {
        return [...acc, `${generalString}. From '${item.oldValue}' to '${item.newValue}'`];
      }
      return acc;
    }, []);
    return str;
  };
  return iter(tree, '').join('\n');
};
