import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig, useReorderKanbanConfig } from "utils/use-optimistic-options";

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

//删除项目
export const useDeleteKanban = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        ({ id }: { id: number }) => client(
            `kanbans/${id}`, {
                method: 'DELETE',
            }),
        useDeleteConfig(queryKey)
    )
}

export interface SortProps {
    //被操作的id
    fromId: number
    //被作为标识的id
    referenceId: number
    //操作的类型，放置到前面还是后面
    type: 'before' | 'after'

    fromKanbanId?: number
    toKanbanId?: number

}

//在拖拽发生后重新排序看板
export const useReorderKanban = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        (param: SortProps) => client(
            `kanbans/reorder`, {
                method: 'POST',
                data: param
            }),
        useReorderKanbanConfig(queryKey)
    )
}