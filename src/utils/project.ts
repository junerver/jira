import { useCallback, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "screens/project-list/list";
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
    return useMutation(
        (param: Partial<Project>) => client(`projects/${param.id}`, {
            method: 'PATCH',
            data: cleanObject(param)
        }),
        {
            onSuccess: (data) => queryClient.invalidateQueries('projects')
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