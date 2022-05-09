import { render } from '@testing-library/react';
import { Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import React, { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom';
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
    users: User[]
} & TableProps<Project>

const List: React.FC<PropsWithChildren<ListProps>> = ({ users, ...props }) => {
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
                },]} />
    )
}

export default List