import { useMemo, useState } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject, isNullOrUndefined, isVoid, subset } from "utils"

//需要注意传入的必须是一个数组对象，返回值是一个对象，使用reduce函数非常的优雅
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams] = useSearchParams()
    const setSearchParams = useSetUrlSearchParam()
    const [stateKeys] = useState(keys)
    return [
        useMemo(
            () => subset(Object.fromEntries(searchParams), stateKeys) as { [key in K]: string },
            [searchParams, stateKeys]
        ),
        (params: Partial<{ [key in K]: unknown }>) => setSearchParams(params)
    ] as const
}

//专门用来修改url的查询参数的钩子
export const useSetUrlSearchParam = () => {
    const [searchParam, setSearchParam] = useSearchParams()
    return (params: Partial<{ [key in string]: unknown }>) => {
        const o = cleanObject({
            ...Object.fromEntries(searchParam),
            ...params
        }) as URLSearchParamsInit
        return setSearchParam(o)
    }
};