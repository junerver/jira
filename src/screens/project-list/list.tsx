import { render } from '@testing-library/react';
import { Dropdown, Menu, Table, TableProps } from 'antd';
import { ButtonNoPadding } from 'components/lib';
import { Pin } from 'components/pin';
import dayjs from 'dayjs';
import React, { PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEditProjects } from 'utils/project';
import { projectListActions } from './project-list.slice';
import { User } from './search-panel';

export type Project = {
    id: number,
    name: string,
    personId: number,
    pin: boolean,
    organization: string,
    created: number;
}
//扩展TableProps，增加users
type ListProps = {
    users: User[];
    refresh: () => void;
} & TableProps<Project>

const List: React.FC<PropsWithChildren<ListProps>> = ({ users, ...props }) => {
    const dispatch = useDispatch();
    const { mutate } = useEditProjects()
    //箭头函数柯里化的简写方式非常优雅
    const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(props.refresh)
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
                        return <Dropdown overlay={
                            <Menu>
                                <Menu.Item key={'edit'}>
                                    <ButtonNoPadding type='link' onClick={() => dispatch(projectListActions.openProjectModal())}>编辑</ButtonNoPadding>
                                </Menu.Item>
                            </Menu>
                        }>
                            <ButtonNoPadding type='link'>...</ButtonNoPadding>
                        </Dropdown>
                    }
                }

            ]} />
    )
}

export default List