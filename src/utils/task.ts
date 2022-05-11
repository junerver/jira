import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { Task } from "types/task";
import { useHttp } from "./http";

//用于获取看板的自定义钩子
export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp()
    return useQuery<Task[]>(
        ['tasks', param],
        () => client('tasks', { data: param })
    )
}