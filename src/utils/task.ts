import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig, useEditConfig } from "utils/use-optimistic-options";

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