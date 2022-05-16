import { QueryKey, useMutation, useQuery } from "react-query";
import { Project } from "types/project";

import { cleanObject } from "utils";
import { useHttp } from "./http";

import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

//用于搜索项目的自定义钩子
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projects", cleanObject(param)], () =>
    client("projects", { data: param })
  );
};

//编辑项目的钩子
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<Project>) =>
      client(`projects/${param.id}`, {
        method: "PATCH",
        data: cleanObject(param),
      }),
    useEditConfig(queryKey)
  );
};

//新增项目
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (param: Partial<Project>) =>
      client(`projects`, {
        method: "POST",
        data: cleanObject(param),
      }),
    useAddConfig(queryKey)
  );
};

//删除项目
export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

//根据id获取项目详情的钩子
export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id),
    }
  );
};
