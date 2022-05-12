

import { Button, Input } from 'antd'
import { Row } from 'components/lib'
import { TaskTypeSelect } from 'components/task-type-select'
import { UserSelect } from 'components/user-select'
import React from 'react'
import { useSetUrlSearchParam } from 'utils/url'
import { useTasksSearchParams } from './util'

export const SearchPanel = () => {

    const searchParams = useTasksSearchParams()
    const setSearchParams = useSetUrlSearchParam()
    const reset = () => {
        setSearchParams({
            typeId: undefined,
            processorId: undefined,
            tagId: undefined,
            name: undefined,
        })
    }

    return (
        <Row marginBottom={4} gap={true}>
            <Input style={{ width: '20rem' }}
                placeholder={'任务名'}
                value={searchParams.name}
                onChange={(evt) => setSearchParams({ name: evt.target.value })} />
            <UserSelect defaultOptionName='经办人'
                value={searchParams.processorId}
                onChange={(processorId) => setSearchParams({ processorId })} />
            <TaskTypeSelect defaultOptionName='任务类型'
                value={searchParams.typeId}
                onChange={(typeId) => setSearchParams({ typeId })} />
            <Button onClick={reset}>清除</Button>
        </Row>
    )
}
