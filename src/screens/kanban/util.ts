import { useMemo } from "react";
import { useLocation } from "react-router";
import { useProject } from "utils/project";
import { useUrlQueryParam } from "utils/url";

//获取当前路径的id
export const useProjectIdInUrl = () => {
    const { pathname } = useLocation()
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
};

//获取当前路径id对应的project
export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbansSearchParams = () => ({ projectId: useProjectIdInUrl() })
export const useKanbansQueryKey = () => ['kanbans', useKanbansSearchParams()]

export const useTasksSearchParams = () => {
    const [param, setParam] = useUrlQueryParam([
        'name',
        'typeId',
        'processorId',
        'tagId'
    ])
    const projectId = useProjectIdInUrl()
    return useMemo(() => ({
        projectId,
        typeId: Number(param.typeId) || undefined,
        processorId: Number(param.processorId) || undefined,
        tagId: Number(param.tagId) || undefined,
        name: param.name || undefined
    }), [param, projectId])
}
//严重 bug，因为没有调用钩子 ，导致不能乐观更新
export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]
