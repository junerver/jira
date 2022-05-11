import { useCallback, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "screens/project-list/list";
import { useProjectsSearchParams } from "screens/project-list/util";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

//用于搜索项目的自定义钩子
export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    return useQuery<Project[]>(
        ['projects', param],
        () => client('projects', { data: cleanObject(param || {}) })
    )
}

//编辑项目的钩子
export const useEditProject = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    const [searchParams] = useProjectsSearchParams()
    const queryKey = ['projects', searchParams]
    return useMutation(
        (param: Partial<Project>) => client(`projects/${param.id}`, {
            method: 'PATCH',
            data: cleanObject(param)
        }),
        {
            //mutate成功后回调
            onSuccess: (data) => queryClient.invalidateQueries(queryKey),
            //执行时立即回调
            async onMutate(param: Partial<Project>) {
                //乐观更新，patch后执行的是刷新列表 即请求：/projects

                //根据请求的条件，获取当前缓存的数据
                const previous = queryClient.getQueryData(queryKey)
                //将本次patch的数据用于更新缓存
                queryClient.setQueryData(queryKey, (oldData?: Project[]) => {
                    return oldData?.map(item => item.id === param.id ? { ...item, ...param } : item) || []
                })
                return previous
            },
            //mutate失败后回调，配合onMutate乐观更新时一般执行回滚
            onError: (err, newItems, context) => {
                //此处的previous是onMutate执行后的结果，注意要封装成对象？？
                queryClient.setQueryData(queryKey, context)
            }
        }
    )
}

//新增项目
export const useAddProject = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        (param: Partial<Project>) => client(
            `projects`, {
            method: 'POST',
            data: cleanObject(param)
        }),
        {
            onSuccess: (data) => queryClient.invalidateQueries('projects')
        }
    )
}

//根据id获取项目详情的钩子
export const useProject = (id?: number) => {
    const client = useHttp()
    return useQuery<Project>(
        ['project', { id }],
        () => client(`projects/${id}`),
        {
            enabled: Boolean(id)
        }
    )
}