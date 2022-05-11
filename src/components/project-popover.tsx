import styled from '@emotion/styled'
import { Button, Divider, List, Popover, Typography } from 'antd'
import React from 'react'
import { useProjectModal } from 'screens/project-list/util'
import { useProjects } from 'utils/project'
import { ButtonNoPadding } from './lib'

export const ProjectPopover = () => {
    //获取全部项目
    const { data: projects, isLoading } = useProjects()
    const { open } = useProjectModal()

    //筛选pin为true的项目
    const pinnedProjects = projects?.filter(project => project.pin)


    const content = <Container>
        <Typography.Text type='secondary'>收藏项目</Typography.Text>
        <List>
            {
                pinnedProjects?.map(project => (
                    <List.Item key={project.id}>
                        <List.Item.Meta title={project.name} />
                    </List.Item>
                ))
            }
        </List>
        <Divider />
        <ButtonNoPadding type='link' onClick={() => open()}>创建项目</ButtonNoPadding>
    </Container>
    return (
        <Popover
            placement='bottom'
            content={content}
        >
            <span>项目</span>
        </Popover>
    )
}

const Container = styled.div`
    min-width: 30rem;
`