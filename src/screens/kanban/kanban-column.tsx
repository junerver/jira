import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import { useKanbansQueryKey, useTaskModal, useTasksSearchParams } from "./util";
import taskIcon from 'assets/task.svg';
import bugIcon from 'assets/bug.svg';
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { CreateTask } from "./create-task";
import { Task } from "types/task";
import { Mark } from "components/mark";
import { useDeleteKanban } from "utils/kanban";
import { Row } from "components/lib";
import React from "react";
import { Drag, Drop, DropChild } from "../../components/drag-and-drop";


export const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes()
    const name = taskTypes?.find(taskType => taskType.id === id)?.name
    if (!name) return null
    return <img width='18rem' alt="" src={name === 'task' ? taskIcon : bugIcon} />
}

//任务卡片
const TaskCard = ({ task }: { task: Task }) => {
    const { startEdit } = useTaskModal()
    const { name: keyword } = useTasksSearchParams()
    return (
        <Card
            onClick={() => startEdit(task.id)}
            style={{ 'marginBottom': '0.5rem', 'cursor': 'pointer' }}
            key={task.id}>
            <div>
                <Mark
                    keyword={keyword || ''}
                    name={task.name}
                />
            </div>
            <TaskTypeIcon id={task.typeId} />
        </Card>
    )
}

//任务组
export const KanbanColumn = React.forwardRef<HTMLDivElement, { kanban: Kanban }>(
    ({ kanban, ...props }: { kanban: Kanban }, ref) => {
        const { data: allTask } = useTasks(useTasksSearchParams())
        const tasks = allTask?.filter(task => task.kanbanId === kanban.id)

        return (
            <Container ref={ref} {...props}>
                <Row between={true}>
                    <h3>{kanban.name}</h3>
                    <More kanban={kanban} />
                </Row>

                <TaskContainer>
                    <Drop
                        direction={'vertical'}
                        droppableId={`${kanban.id}`}
                        type={'ROW'}>
                        <DropChild
                            // 此处使用一个minHeight撑起元素，避免盒子没有高度导致不能拖拽放置
                            style={{ minHeight: '5px' }}
                        >
                            {
                                tasks?.map((task, index) => (
                                    <Drag
                                        key={task.id}
                                        draggableId={`task${task.id}`}
                                        index={index}>
                                        <div>
                                            <TaskCard task={task} />
                                        </div>
                                    </Drag>
                                ))
                            }
                        </DropChild>
                    </Drop>
                    <CreateTask kanbanId={kanban.id} />
                </TaskContainer>
            </Container>
        )
    })

const More = ({ kanban }: { kanban: Kanban }) => {
    const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbansQueryKey())
    const confirmDelete = () => {
        Modal.confirm({
            title: '确认删除',
            content: '确认删除该项目吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => deleteKanban({ id: kanban.id })
        })
    }
    const overlay = (
        <Menu
            items={[{
                key: 'delete',
                label: '删除',
                onClick: () => confirmDelete()
            }]}
        />
    )
    return (
        <Dropdown overlay={overlay}>
            <Button type="link">···</Button>
        </Dropdown>
    )
}

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;
  //不显示滚动条
  ::-webkit-scrollbar {
    display: none;
  }
`