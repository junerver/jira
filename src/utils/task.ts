import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig, useEditConfig, useReorderTaskConfig } from "utils/use-optimistic-options";
import { SortProps } from "./kanban";

//用于获取看板的自定义钩子
export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp()
    return useQuery<Task[]>(
        ['tasks', param],
        () => client('tasks', { data: param })
    )
}

//新增看板中的任务
export const useAddTask = (queryKey: QueryKey) => {
    const client = useHttp()

    return useMutation(
        (param: Partial<Task>) => client(
            `tasks`, {
                method: 'POST',
                data: param
            }),
        useAddConfig(queryKey)
    )
}

//根据id获取任务
export const useTask = (id?: number) => {
    const client = useHttp()
    return useQuery<Task>(
        ['task', { id }],
        () => client(`tasks/${id}`),
        {
            enabled: Boolean(id)
        }
    )
}

export const useEditTask = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        (param: Partial<Task>) => client(`tasks/${param.id}`, {
            method: 'PATCH',
            data: param
        }),
        useEditConfig(queryKey)
    )
}

//删除项目
export const useDeleteTask = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        ({ id }: { id: number }) => client(
            `tasks/${id}`, {
                method: 'DELETE',
            }),
        useDeleteConfig(queryKey)
    )
}

//在拖拽发生后重新排序看板
export const useReorderTask = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        (param: SortProps) => client(
            `tasks/reorder`, {
                method: 'POST',
                data: param
            }),
        useReorderTaskConfig(queryKey)
    )
}