import styled from '@emotion/styled'
import { Divider, List, Popover, Typography } from 'antd'
import React from 'react'
import { useProjectModal } from 'screens/project-list/util'
import { useUsers } from "../utils/user";

export const UserPopover = () => {
    //获取全部项目
    const { data: users, isLoading, refetch } = useUsers()
    const { open } = useProjectModal()


    const content = <Container>
        <Typography.Text type='secondary'>组员列表</Typography.Text>
        <List>
            {
                users?.map(user => (
                    <List.Item key={user.id}>
                        <List.Item.Meta title={user.name} />
                    </List.Item>
                ))
            }
        </List>
        <Divider />
    </Container>
    return (
        <Popover
            onVisibleChange={() => refetch()}
            placement='bottom'
            content={content}
        >
            <span>组员</span>
        </Popover>
    )
}

const Container = styled.div`
  min-width: 30rem;
`