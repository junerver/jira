import { Button, Drawer } from 'antd'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'store'

import { closeProjectModal, selectProjectModalOpen } from './project-list.slice'

export const ProjectModal = () => {
    const dispatch = useAppDispatch()
    const projectModalOpen = useSelector(selectProjectModalOpen)
    return (
        <Drawer
            onClose={() => dispatch(closeProjectModal())}
            visible={projectModalOpen}
            width={'100%'}>
            <h1>Project Modal</h1>
            <Button type='primary' onClick={() => dispatch(closeProjectModal())} >关闭</Button>
        </Drawer>
    )
}


