import styled from '@emotion/styled'
import { Spin } from 'antd'
import { ScreenContainer } from 'components/lib'
import { useDocumentTitle } from 'utils'
import { useKanbans, useReorderKanban } from 'utils/kanban'
import { useReorderTask, useTasks } from 'utils/task'
import { CreateKanban } from './create-kanban'
import { KanbanColumn } from './kanban-column'
import { SearchPanel } from './search-panel'
import { TaskModal } from './task-modal'
import {
    useKanbansQueryKey,
    useKanbansSearchParams,
    useProjectInUrl,
    useTasksQueryKey,
    useTasksSearchParams
} from './util'
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "../../components/drag-and-drop";
import { useCallback } from "react";

export const KanbanScreen = () => {
    useDocumentTitle('看板列表')
    const { data: currentProject } = useProjectInUrl()
    const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbansSearchParams())
    const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
    const isLoading = taskIsLoading || kanbanIsLoading
    const onDragEnd = useDragEnd()
    return (
        <DragDropContext
            onDragEnd={onDragEnd}>
            <ScreenContainer>
                <h1>{currentProject?.name}看板</h1>
                <SearchPanel />
                {isLoading ? <Spin size='large' /> : (
                    <ColumnContainer>
                        <Drop
                            type={'COLUMN'}
                            direction={'horizontal'}
                            droppableId={'kanban'}
                        >
                            <DropChild style={{ display: 'flex' }}>
                                {
                                    kanbans?.map((kanban, index) => (
                                        <Drag
                                            key={kanban.id}
                                            draggableId={`kanban${kanban.id}`}
                                            index={index}>
                                            <KanbanColumn kanban={kanban} />
                                        </Drag>
                                    ))
                                }
                            </DropChild>
                        </Drop>
                        <CreateKanban />
                    </ColumnContainer>
                )}
                <TaskModal />
            </ScreenContainer>
        </DragDropContext>
    )
}

export const useDragEnd = () => {
    //获取全部看板
    const { data: kanbans } = useKanbans(useKanbansSearchParams())
    //拿到重排序看板的mutate
    const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey())

    const { data: tasks = [] } = useTasks(useTasksSearchParams())
    const { mutate: reorderTask } = useReorderTask(useTasksQueryKey())

    return useCallback(({ source, destination, type }: DropResult) => {
            if (!destination) return

            //对应我们声明 <Drop  type={'COLUMN'} ... />，表示这是我们拖动的看板
            if (type === 'COLUMN') {
                //获取拖动的看板id
                const fromId = kanbans?.[source.index].id
                const toId = kanbans?.[destination.index].id
                if (!fromId || !toId || fromId === toId) return;
                const type = destination.index > source.index ? 'after' : 'before'
                reorderKanban({ fromId, referenceId: toId, type })
            }
            //拖动任务，重新排序
            if (type === 'ROW') {
                //对应在kanban-column中声明看板列的droppableId
                const fromKanbanId = +source.droppableId
                const toKanbanId = +destination.droppableId
                const fromTask = tasks.filter(task => task.kanbanId === fromKanbanId)[source.index]
                const toTask = tasks.filter(task => task.kanbanId === toKanbanId)[destination.index]
                if (fromTask?.id === toTask?.id) return;

                const type = destination.index > source.index ? 'after' : 'before'
                reorderTask({
                    fromId: fromTask?.id,
                    referenceId: toTask?.id,
                    type,
                    fromKanbanId,
                    toKanbanId
                })

            }
        }, [kanbans, reorderKanban, reorderTask, tasks]
    )
}

export const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
  //不显示滚动条
  ::-webkit-scrollbar {
    display: none;
  }
`;