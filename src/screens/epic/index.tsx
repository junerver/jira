import React, { useState } from 'react'
import { Row, ScreenContainer } from "../../components/lib";
import { useDocumentTitle } from "../../utils";
import { useProjectInUrl } from "../kanban/util";
import { useDeleteEpic, useEpics } from "../../utils/epic";
import { useEpicsQueryKey, useEpicsSearchParams } from "./util";
import { Button, List, Modal } from "antd";
import dayjs from "dayjs";
import { useTasks } from "../../utils/task";
import { Link } from "react-router-dom";
import { CreateEpic } from "./create-epic";
import styled from "@emotion/styled";

export const EpicScreen = () => {
    useDocumentTitle('任务组列表')
    const { data: currentProject } = useProjectInUrl()
    const { data: epics } = useEpics(useEpicsSearchParams())
    const { data: tasks } = useTasks({ projectId: currentProject?.id })
    const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey())
    const [epicCreateOpen, setEpicCreateOpen] = useState(false)
    const deleteConfirm = (id: number) => {
        Modal.confirm({
            title: '确认删除',
            content: '确认删除该任务组吗？',
            onOk: () => deleteEpic({ id }),
            okText: '确认',
            cancelText: '取消'
        })
    }
    return (
        <ScreenContainer>
            <Row between={true}>

                <h1>{currentProject?.name}任务组</h1>
                <Button type="link" onClick={() => setEpicCreateOpen(true)}>创建任务组</Button>
            </Row>
            <NoScrollBarList>

                <List
                    dataSource={epics}
                    itemLayout={'vertical'}
                    renderItem={(epic) => (
                        <List.Item>
                            <List.Item.Meta
                                title={
                                    <Row between={true}>
                                        <span>{epic.name}</span>
                                        <Button
                                            onClick={() => deleteConfirm(epic.id)}
                                            type={'link'}
                                        >
                                            删除
                                        </Button>
                                    </Row>
                                }
                                description={
                                    <div>
                                        <div>开始时间：{dayjs(epic.start).format('YYYY-MM-DD')}</div>
                                        <div>结束时间：{dayjs(epic.end).format('YYYY-MM-DD')}</div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            {
                                                tasks?.filter(task => task.epicId === epic.id).map(task => (
                                                    <Link
                                                        to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                                                        key={task.id}
                                                    >
                                                        {task.name}
                                                    </Link>
                                                ))
                                            }
                                        </div>

                                    </div>
                                }
                            />
                        </List.Item>)} />
            </NoScrollBarList>
            <CreateEpic visible={epicCreateOpen} onClose={() => {
                setEpicCreateOpen(false)
            }} />
        </ScreenContainer>
    )
}

const NoScrollBarList = styled.div`
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`
