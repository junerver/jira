
import { Button, Input, Modal } from 'antd'
import Form from 'antd/lib/form'
import { TaskTypeSelect } from 'components/task-type-select'
import { UserSelect } from 'components/user-select'
import { useEffect } from 'react'
import { useDeleteTask, useEditTask } from 'utils/task'
import { useTaskModal, useTasksQueryKey } from './util'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

export const TaskModal = () => {
    const [form] = Form.useForm()
    const { editingTaskId, editingTask, close } = useTaskModal()
    const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTasksQueryKey())

    const { mutateAsync: deleteTask } = useDeleteTask(useTasksQueryKey())

    const onCancel = () => {
        close()
        form.resetFields()
    }

    const onOk = async () => {
        await editTask({ ...editingTask, ...form.getFieldsValue() })
        onCancel()
    }
    useEffect(() => {
        form.setFieldsValue(editingTask)
    }, [form, editingTask])

    const confirmDelete = () => {
        Modal.confirm({
            title: '确认删除',
            content: '确认删除该任务吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                deleteTask({ id: Number(editingTaskId) })
                close()
            }
        })
    }
    return (
        <Modal
            forceRender={true}
            onCancel={close}
            onOk={onOk}
            okText='确认'
            cancelText='取消'
            confirmLoading={editLoading}
            visible={!!editingTaskId}
            title='编辑任务'
        >
            <Form
                {...layout}
                initialValues={editingTask}
                form={form}
            >
                <Form.Item
                    label="任务名"
                    name={'name'}
                    rules={[{ required: true, message: '请输入任务名' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="经办人"
                    name={'processorId'}
                >
                    <UserSelect style={{ width: '100%' }} defaultOptionName='经办人' />
                </Form.Item>
                <Form.Item
                    label="类型"
                    name={'typeId'}
                    rules={[{ required: true, message: '请选择类型' }]}
                >
                    <TaskTypeSelect style={{ width: '100%' }} />
                </Form.Item>

            </Form>
            <div style={{ 'textAlign': 'right' }}>
                <Button
                    onClick={() => confirmDelete()}
                    type={'primary'}
                    danger
                >
                    删除
                </Button>
            </div>
        </Modal>
    )
}
