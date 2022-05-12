import styled from '@emotion/styled'
import { Menu } from 'antd'
import React from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { EpicScreen } from 'screens/epic'
import { KanbanScreen } from 'screens/kanban'

const useRouteType = () => {
    const unit = useLocation().pathname.split('/')
    return unit[unit.length - 1]
}

export const ProjectScreen = () => {
    const nav = useNavigate()
    const routeType = useRouteType()
    return (
        <Container>
            <Aside>

                <Menu
                    selectedKeys={[routeType]}
                    items={[
                        {
                            key: 'kanban',
                            label: '看板',
                            onClick: () => nav('kanban')
                        },
                        {
                            key: 'epic',
                            label: '任务组',
                            onClick: () => nav('epic')
                        }
                    ]}
                />
            </Aside>
            <Main>
                <Routes>
                    {/* 此处必须要使用replace，否则会使得路由栈中存在无效路由
                    因为路由栈是这样的 ['/', '/project','/project/id','/project/id/kanban']
                */}
                    <Route index element={<Navigate to={'kanban'} replace />} />
                    <Route path='/kanban' element={<KanbanScreen />} />
                    <Route path='/epic' element={<EpicScreen />} />
                </Routes>
            </Main>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 16rem 1fr;
    width: 100%;
    overflow: hidden;
`

const Aside = styled.aside`
background-color: rgb(244,245,247);
display: flex;
flex-direction: column;
`

const Main = styled.div`
    box-shadow: -5px 0 5px -5px rgba(0,0,0,0.2);
    display: flex;
    overflow: hidden;
`
