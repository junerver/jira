import React, { useEffect, useState } from "react";
import List from "./list";
import SearchPanel, { SearchParams } from "./search-panel";
import { cleanObject, useDebounce, useMount } from "../../utils";
import qs from "qs";
import { useHttp } from "utils/http";



const apiUrl = process.env.REACT_APP_API_URL;
const ProjectListScreen = () => {
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
    client('projects', { data: cleanObject(debounceParam) }).then(setList)
    // fetch(
    //   `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
    // ).then(async (res) => {
    //   if (res.ok) {
    //     setList(await res.json());
    //   }
    // });
  }, [debounceParam]);
  useMount(() => {
    client('users').then(setUsers)
    // fetch(`${apiUrl}/users`).then(async (res) => {
    //   if (res.ok) {
    //     setUsers(await res.json());
    //   }
    // });
  });
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};

export default ProjectListScreen;
