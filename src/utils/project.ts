import { useCallback, useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

//用于搜索项目的自定义钩子
export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    const { run, ...result } = useAsync<Project[]>()

    const fetchProjects = useCallback(() => client('projects', { data: cleanObject(param || {}) }), [client, param])
    //输入变化后请求接口
    useEffect(() => {
        run(fetchProjects(), { retry: fetchProjects })

    }, [fetchProjects, param, run]);
    return result
}

//编辑项目的钩子
export const useEditProjects = () => {
    const client = useHttp()
    const { run, ...asyncResult } = useAsync()
    const mutate = (param: Partial<Project>) => {
        return run(client(`projects/${param.id}`, { method: 'PATCH', data: cleanObject(param) }))
    }
    return { mutate, ...asyncResult }
}

export const usePostProjects = () => {
    const client = useHttp()
    const { run, ...asyncResult } = useAsync()
    const mutate = (param: Partial<Project>) => {
        return run(client(`projects/${param.id}`, { method: 'POST', data: cleanObject(param) }))
    }
    return { mutate, ...asyncResult }
}