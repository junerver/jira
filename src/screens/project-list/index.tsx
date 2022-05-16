import React, { useDeferredValue } from "react";
import List from "./list";
import SearchPanel from "./search-panel";
import { useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Button } from "antd";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { ErrorBox, Row } from "components/lib";

const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  //要查找的内容，一个是输入框键入的name，一个是select选择的人的id
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDeferredValue(param));
  const { data: users } = useUsers();
  const { open } = useProjectModal();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button type="primary" onClick={() => open()}>
          创建项目
        </Button>
      </Row>

      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

export default ProjectListScreen;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 3.2rem;
`;
