import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { EpicScreen } from 'screens/epic'
import { KanbanScreen } from 'screens/kanban'

export const ProjectScreen = () => {
    return (
        <div>
            <h1>ProjectScreen</h1>
            <Link to={'kanban'}>看板</Link>
            <Link to={'epic'}>任务组</Link>
            <Routes>
                {/* 此处必须要使用replace，否则会使得路由栈中存在无效路由
                    因为路由栈是这样的 ['/', '/project','/project/id','/project/id/kanban']
                */}
                <Route index element={<Navigate to={'kanban'} replace />} />
                <Route path='/kanban' element={<KanbanScreen />} />
                <Route path='/epic' element={<EpicScreen />} />
            </Routes>
        </div>
    )
}
