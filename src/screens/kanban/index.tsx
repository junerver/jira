import styled from '@emotion/styled'
import { Spin } from 'antd'
import { ScreenContainer } from 'components/lib'
import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'
import { useTasks } from 'utils/task'
import { CreateKanban } from './create-kanban'
import { KanbanColumn } from './kanban-column'
import { SearchPanel } from './search-panel'
import { useKanbansQueryKey, useKanbansSearchParams, useProjectInUrl, useTasksSearchParams } from './util'

export const KanbanScreen = () => {
    useDocumentTitle('看板列表')
    const { data: currentProject } = useProjectInUrl()
    const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbansSearchParams())
    const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
    const isLoading = taskIsLoading || kanbanIsLoading

    return (
        <ScreenContainer>
            <h1>{currentProject?.name}看板</h1>
            <SearchPanel />
            {isLoading ? <Spin size='large' /> : (
                <ColumnContainer>
                    {
                        kanbans?.map(kanban => (<KanbanColumn kanban={kanban} key={kanban.id} />))
                    }
                    <CreateKanban />
                </ColumnContainer>
            )}
        </ScreenContainer>
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