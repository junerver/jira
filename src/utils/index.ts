import exp from "constants";
import { useState, useEffect, useRef } from "react";
// export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) => value === undefined || value === null || value === "";
export const isNullOrUndefined = (value: unknown) => value === undefined || value === null;

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
    //todo 此处不能把callback加入依赖 这与useCallback&useMemo有关
    //eslint-disable-next-line react-hooks/exhaustive-deps
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

//实现方式1，通过闭包实现了保存了旧的title被保存到unmount的时机
// export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
//   const oldTitle = document.title
//   console.log('渲染时的title：', oldTitle);

//   useEffect(() => {
//     document.title = title;
//   }, [title]);
//   useEffect(() => {
//     return () => {
//       if (!keepOnUnmount) {
//         console.log('卸载时的title：', oldTitle);
//         document.title = oldTitle;
//       }
//     }
//   }, []);
// }

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    }
  }, [keepOnUnmount, oldTitle]);
}

export const resetRoute = () => window.location.href = window.location.origin

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};