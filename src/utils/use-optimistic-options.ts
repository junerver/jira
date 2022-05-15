import { QueryKey, useQueryClient } from "react-query";
import { reorder } from "./reorder";
import { Task } from "../types/task";

//备注，我并不认同此处处理乐观更新的抽离方式，这种抽象仅适合数组、列表，
//如果我们要对一个对象进行乐观更新，并不是刷新列表，而是更新一个对象，
//那么我们就需要另外抽象一个对象的更新方法

export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any) => any[]) => {
    const queryClient = useQueryClient();
    return {
        //mutate成功后回调
        onSuccess: () => queryClient.invalidateQueries(queryKey),
        //执行时立即回调
        async onMutate(target: any) {
            //乐观更新，patch后执行的是刷新列表 即请求：/projects

            //根据请求的条件，获取当前缓存的数据
            const previous = queryClient.getQueryData(queryKey)
            //将本次patch的数据用于更新缓存
            queryClient.setQueryData(queryKey, (old?: any[]) => {
                return callback(target, old)
            })
            return previous
        },
        //mutate失败后回调，配合onMutate乐观更新时一般执行回滚
        onError: (err: any, newItems: any, context: any) => {
            //此处的previous是onMutate执行后的结果，注意要封装成对象？？
            queryClient.setQueryData(queryKey, context)
        }
    }
};

export const useDeleteConfig = (queryKey: QueryKey) =>
    useConfig(
        queryKey,
        (target, old) => old?.filter((item: any) => item.id !== target.id) || []
    );
export const useEditConfig = (queryKey: QueryKey) =>
    useConfig(
        queryKey,
        (target, old) =>
            //使用请求数据更新原始数组中的指定对象
            old?.map((item: any) =>
                item.id === target.id ? { ...item, ...target } : item
            ) || []
    );

export const useAddConfig = (queryKey: QueryKey) =>
    useConfig(queryKey, (target, old) => (old ? [...old, target] : []));

//拖动排序的乐观更新

export const useReorderKanbanConfig = (queryKey: QueryKey) =>
    useConfig(queryKey, (target, old) => reorder({ list: old, ...target }));

export const useReorderTaskConfig = (queryKey: QueryKey) =>
    useConfig(queryKey, (target, old) => {
        const orderedList = reorder({ list: old, ...target }) as Task[];
        return orderedList.map((item) =>
            item.id === target.fromId
                ? { ...item, kanbanId: target.toKanbanId }
                : item
        );
    });