const flattenDeep = (_array) => {
  const _arr = _array.reduce((acc, obj) => {
    acc.push({
      label: obj.label,
      id: obj.id,
    });
    if (obj.children) acc.push(...flattenDeep(obj.children));
    return acc;
  }, []);
  return _arr;
};
const findParentDeep = (_array, data) => {
  if (!data) {
    return { parent: _array, index: _array.length };
  }
  let obj = {};
  const _index = _array.findIndex((e) => e.id === data.id);
  if (_index >= 0) {
    obj.parent = _array;
    obj.index = _index;
  } else {
    _array.forEach((e) => {
      if (!obj.parent && e.children) {
        const { parent, index } = findParentDeep(e.children, data);
        if (parent) obj = { parent, index };
      }
    });
  }
  return obj;
};
export { flattenDeep, findParentDeep };
