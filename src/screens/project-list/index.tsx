import React, { useEffect, useState } from "react";
import List from "./list";
import SearchPanel, { SearchParams } from "./search-panel";
import { cleanObject, useDebounce, useMount } from "../../utils";
import qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";



const apiUrl = process.env.REACT_APP_API_URL;
const ProjectListScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  //要查找的内容，一个是输入框键入的name，一个是select选择的人的id
  const [param, setParam] = useState<SearchParams>({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 500);
  //下拉列表的状态
  const [users, setUsers] = useState([]);
  //查询结果的状态
  const [list, setList] = useState([]);
  const client = useHttp()
  //输入变化后请求接口
  useEffect(() => {
    setIsLoading(true);
    client('projects', { data: cleanObject(debounceParam) })
      .then(setList)
      .catch(error => {
        setError(error);
        setList([]);
      })
      .finally(() => setIsLoading(false));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam]);
  useMount(() => {
    client('users').then(setUsers)
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List loading={isLoading} dataSource={list} users={users} />
    </Container>
  );
};

export default ProjectListScreen;

const Container = styled.div`
    padding: 3.2rem;
`
