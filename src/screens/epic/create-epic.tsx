import { Drawer, DrawerProps, Form, Input, Spin } from "antd";
import styled from "@emotion/styled";
import { ErrorBox, LongButton } from "components/lib";
import React, { useEffect } from "react";
import { useAddEpic } from "utils/epic";
import { useEpicsQueryKey } from "./util";
import { useProjectIdInUrl } from "../kanban/util";

//透传drawer的两个属性
export const CreateEpic = ({
  visible,
  onClose,
}: Pick<DrawerProps, "visible"> & { onClose: () => void }) => {
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicsQueryKey());
  const projectId = useProjectIdInUrl();
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    await addEpic({
      ...values,
      projectId,
    });
    onClose();
  };
  useEffect(() => {
    form.resetFields();
  }, [form, visible]);
  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      forceRender={true}
      destroyOnClose={true}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <h1>创建任务组</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout="vertical"
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label="任务组名称"
                name="name"
                rules={[{ required: true, message: "请输入任务组名称" }]}
              >
                <Input placeholder="请输入任务组名称" />
              </Form.Item>

              <Form.Item>
                <LongButton
                  loading={isLoading}
                  type="primary"
                  htmlType="submit"
                >
                  提交
                </LongButton>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
