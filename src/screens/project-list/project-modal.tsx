import styled from '@emotion/styled'
import { Button, Drawer, Form, Input, Spin } from 'antd'
import { ErrorBox, LongButton } from 'components/lib'
import { UserSelect } from 'components/user-select'
import React, { useEffect } from 'react'
import { useProjectModal, useProjectsQueryKey } from 'screens/project-list/util'
import { useAddProject, useEditProject } from 'utils/project'

export const ProjectModal = () => {
    const { projectModalOpen, close, editingProject, isLoading } = useProjectModal()
    const useMutateProject = editingProject ? useEditProject : useAddProject
    const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(useProjectsQueryKey())
    const [form] = Form.useForm()
    const onFinish = (values: any) => {
        mutateAsync({ ...editingProject, ...values })
            .then(() => {
                closeModal()
            })
    }

    const closeModal = () => {
        form.resetFields();
        close();
    };

    useEffect(() => {
        form.setFieldsValue(editingProject)
    }, [editingProject, form])

    const title = editingProject ? '编辑项目' : '新建项目'
    return (
        <Drawer
            forceRender={true}
            onClose={closeModal}
            visible={projectModalOpen}
            width={'100%'}>
            <Container>
                {
                    isLoading ?
                        <Spin size='large' /> :
                        <>
                            <h1>{title}</h1>
                            <ErrorBox error={error} />
                            <Form
                                form={form}
                                layout='vertical'
                                style={{ width: '40rem' }}
                                onFinish={onFinish}>
                                <Form.Item label="项目名称" name="name" rules={[{ required: true, message: '请输入项目名称' }]}>
                                    <Input placeholder='请输入项目名称' />
                                </Form.Item>
                                <Form.Item label="部门名称" name="organization" rules={[{ required: true, message: '请输入部门名称' }]}>
                                    <Input placeholder='请输入部门名称' />
                                </Form.Item>
                                <Form.Item label="负责人" name="personId">
                                    <UserSelect defaultOptionName='负责人' />
                                </Form.Item>

                                <Form.Item>
                                    <LongButton loading={mutateLoading} type='primary' htmlType='submit'>提交</LongButton>
                                </Form.Item>
                            </Form>
                        </>
                }
            </Container>
        </Drawer>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 80vh;
    align-items: center;
    justify-content: center;
`
