import { useMemo } from "react"
import { useProject } from "utils/project"
import { useUrlQueryParam } from "utils/url"

export const useProjectsSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    return [
        useMemo(
            () => ({ ...param, personId: Number(param.personId) || undefined }),
            [param]),
        setParam
    ] as const
}

//用于编辑项目的自定义钩子，可以打开模态窗口编辑项目内容
export const useProjectModal = () => {
    const [{ projectCreate }, setProjectModalOpen] = useUrlQueryParam([
        'projectCreate'
    ])
    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])
    //获取要编辑的页面
    const { data: editingProject, isLoading } = useProject(Number(editingProjectId))

    const open = () => setProjectModalOpen({ projectCreate: true })
    //关闭窗口时，清除编辑项目的id
    const close = () => {
        if (projectCreate) setProjectModalOpen({ projectCreate: undefined })
        if (editingProjectId) setEditingProjectId({ editingProjectId: undefined })
    }
    const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id })

    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
        open,
        close,
        startEdit,
        editingProject,
        isLoading
    }
};