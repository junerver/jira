import { Dropdown, Menu, Modal, Table, TableProps } from 'antd';
import { ButtonNoPadding } from 'components/lib';
import { Pin } from 'components/pin';
import dayjs from 'dayjs';
import React, { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom';
import { useDeleteProject, useEditProject } from 'utils/project';
import { Project } from '../../types/project';
import { User } from './search-panel';
import { useProjectModal, useProjectsQueryKey } from './util';

//扩展TableProps，增加users
type ListProps = {
    users: User[];
} & TableProps<Project>

const List: React.FC<PropsWithChildren<ListProps>> = ({ users, ...props }) => {
    const { mutate } = useEditProject(useProjectsQueryKey())

    //箭头函数柯里化的简写方式非常优雅
    const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })

    return (
        <Table
            //透传 antd的props
            {...props}
            //每一行的key
            rowKey="id"
            // 是否分页
            pagination={false}
            //渲染的列
            columns={[
                {
                    title: <Pin checked={true} disabled={true} />,
                    render(_, project) {
                        return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
                    }
                },
                {
                    title: '项目名称',
                    sorter: (a, b) => a.name.localeCompare(b.name),
                    render(_, project) {
                        return (
                            <Link to={`${project.id}`}>{project.name}</Link>
                        )
                    }
                },
                {
                    title: '部门',
                    dataIndex: 'organization'
                },
                {
                    title: '项目负责人',
                    render(_, project) {
                        return <span key={project.id}> {users.find(user => user.id === project.personId)?.name || "未知"}</span>
                    }
                },
                {
                    title: '创建时间',
                    render(_, project) {
                        return <span>
                            {project.created ? dayjs(project.created).format("YYYY-MM-DD") : '未知时间'}
                        </span>
                    },
                },
                {
                    render(_, project) {
                        return <More project={project} />
                    }
                }

            ]} />
    )
}

export default List

const More = ({ project }: { project: Project }) => {
    const { startEdit } = useProjectModal()
    const editProject = (id: number) => () => startEdit(id)
    const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey())
    const confirmDeleteProject = (id: number) => () => {
        Modal.confirm({
            title: '确认删除',
            content: '确认删除该项目吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                deleteProject({ id })
            }
        })
    }
    return <Dropdown overlay={
        <Menu
            items={[
                {
                    key: 'edit',
                    label: '编辑',
                    onClick: editProject(project.id)
                }, {
                    key: 'delete',
                    label: '删除',
                    onClick: confirmDeleteProject(project.id)
                }
            ]} />

    }>
        <ButtonNoPadding type='link'>...</ButtonNoPadding>
    </Dropdown>

}