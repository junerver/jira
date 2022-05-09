import { useHttp } from "utils/http";
import { User } from "types/user";
import { useQuery } from "react-query";
import { useAsync } from "./use-async";
import { useMount } from "utils";

//用于查询用户
export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>()
  useMount(() => {
    run(client('users'))
  });
  return result
};