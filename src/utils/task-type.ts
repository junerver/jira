import { useQuery } from "react-query";
import { TaskType } from "types/task-type";
import { useHttp } from "./http";

//用于获取看板任务全部类型的钩子
export const useTaskTypes = () => {
    const client = useHttp()
    return useQuery<TaskType[]>(
        ['tasksTypes'],
        () => client('taskTypes')
    )
}