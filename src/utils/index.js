import { useState, useEffect } from "react";
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

//自定义的仅在初始化时加载一次的钩子
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

//去抖函数，传入一个原本要执行的函数，并设定去抖时长，然后返回去抖后的函数
// const debounce = (func, delay) => {
//   let timer;
//   return () => {
//     if (timer) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//       func();
//     }, delay);
//   };
// };
// const log = debounce(() => console.log("log"), 5000);
// log();
// log();
// log();

//将一个抖动的state传入，返回一个去抖的state
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};
