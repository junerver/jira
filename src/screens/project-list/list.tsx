import { Table } from 'antd';
import React, { PropsWithChildren } from 'react'
import { User } from './search-panel';

type Project = {
    id: string,
    name: string,
    personId: string,
}
type ListProps = {
    list: Project[];
    users: User[]
}
const List: React.FC<PropsWithChildren<ListProps>> = ({ list, users }) => {
    return (
        <Table
            // 是否分页
            pagination={false}
            //数据源
            dataSource={list}
            //渲染的列
            columns={[
                {
                    title: '项目名称',
                    dataIndex: 'name',
                    sorter: (a, b) => a.name.localeCompare(b.name)
                },
                {
                    title: '项目负责人',
                    render(value, project) {
                        return <span key={project.id}> {users.find(user => user.id === project.personId)?.name || "未知"}</span>
                    }
                }]} />
    )
}

export default List