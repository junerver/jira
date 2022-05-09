import React, { useEffect, useState } from "react";
import List, { Project } from "./list";
import SearchPanel, { User } from "./search-panel";
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "../../utils";
import qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useAsync } from "utils/use-async";
import { useProjectsSearchParams } from "./util";

const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)

  //要查找的内容，一个是输入框键入的name，一个是select选择的人的id
  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 500))
  const { data: users } = useUser()

  return (
    <Container>

      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

export default ProjectListScreen;

const Container = styled.div`
    padding: 3.2rem;
`

//用于搜索项目的自定义钩子
const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<Project[]>()
  //输入变化后请求接口
  useEffect(() => {
    run(client('projects', { data: cleanObject(param || {}) }))
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result
}

const useUser = () => {
  const client = useHttp()
  const { run, ...result } = useAsync<User[]>()
  useMount(() => {
    run(client('users'))
  });
  return result
}