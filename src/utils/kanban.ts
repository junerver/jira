import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig, useEditConfig } from "utils/use-optimistic-options";

//用于获取看板的自定义钩子
export const useKanbans = (param?: Partial<Kanban>) => {
    const client = useHttp()
    return useQuery<Kanban[]>(
        ['kanbans', param],
        () => client('kanbans', { data: param })
    )
}


//新增看板
export const useAddKanban = (queryKey: QueryKey) => {
    const client = useHttp()

    return useMutation(
        (param: Partial<Kanban>) => client(
            `kanbans`, {
            method: 'POST',
            data: param
        }),
        useAddConfig(queryKey)
    )
}