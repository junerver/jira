import { useState, useEffect } from "react";
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) => value === undefined || value === null || value === "";

//在js中函数传入对象是一个不好的方式，因为函数可能会污染对象
export const cleanObject = (obj?: { [key: string]: unknown }) => {
  //空对象直接返回
  if (!obj) return {};
  //浅拷贝
  const result = { ...obj };
  //清除对象中的空值
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

//自定义的仅在初始化时加载一次的钩子
export const useMount = (callback: () => void) => {
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
export const useDebounce = <T>(value: T, delay?: number) => {
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

//一个方便的操作数组的钩子
export const useArray = <T>(initialValue: T[]) => {
  const [value, setValue] = useState(initialValue);
  const add = (item: T) => {
    setValue([...value, item]);
  };
  const clear = () => {
    setValue([]);
  }
  const remove = (index: number) => {
    setValue(value.filter((_, i) => i !== index));
  };
  return { value, clear, add, remove };
}