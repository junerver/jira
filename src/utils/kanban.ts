import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";

//用于获取看板的自定义钩子
export const useKanbans = (param?: Partial<Kanban>) => {
    const client = useHttp()
    return useQuery<Kanban[]>(
        ['kanbans', param],
        () => client('kanbans', { data: param })
    )
}