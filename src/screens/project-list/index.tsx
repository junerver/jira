import React, { useEffect, useState } from "react";
import List, { Project } from "./list";
import SearchPanel, { User } from "./search-panel";
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "../../utils";
import qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useAsync } from "utils/use-async";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { ErrorBox, Row } from "components/lib";

const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)

  //要查找的内容，一个是输入框键入的name，一个是select选择的人的id
  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 500))
  const { data: users } = useUsers()
  const { open } = useProjectModal()

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button type="primary" onClick={() => open()}>创建项目</Button>
      </Row>

      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container >
  );
};

export default ProjectListScreen;

const Container = styled.div`
    padding: 3.2rem;
`