export const isFalsy = (value) => (value === 0 ? false : !value);

//在js中函数传入对象是一个不好的方式，因为函数可能会污染对象
export const cleanObject = (obj) => {
  //浅拷贝
  const result = { ...obj };
  //清除对象中的空值
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  //返回值是一个新对象
  return result;
};
