import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject, isNullOrUndefined, isVoid } from "utils"

//需要注意传入的必须是一个数组对象，返回值是一个对象，使用reduce函数非常的优雅
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParam, setSearchParam] = useSearchParams()
    //遍历keys，从search中获取对应的值，返回一个新对象
    return [
        useMemo(
            () => keys.reduce((acc, key: string) => {
                return { ...acc, [key]: searchParam.get(key) || '' };
            }, {} as { [key in K]: string }),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [searchParam]),
        (params: Partial<{ [key in K]: unknown }>) => {
            const o = cleanObject({ ...Object.fromEntries(searchParam), ...params }) as URLSearchParamsInit
            return setSearchParam(o)
        }
    ] as const
}