import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "types/epic";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "utils/use-optimistic-options";

//用于获取看板的自定义钩子
export const useEpics = (param?: Partial<Epic>) => {
    const client = useHttp()
    return useQuery<Epic[]>(
        ['epics', param],
        () => client('epics', { data: param })
    )
}


//新增看板
export const useAddEpic = (queryKey: QueryKey) => {
    const client = useHttp()

    return useMutation(
        (param: Partial<Epic>) => client(
            `epics`, {
                method: 'POST',
                data: param
            }),
        useAddConfig(queryKey)
    )
}

//删除项目
export const useDeleteEpic = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        ({ id }: { id: number }) => client(
            `epics/${id}`, {
                method: 'DELETE',
            }),
        useDeleteConfig(queryKey)
    )
}
