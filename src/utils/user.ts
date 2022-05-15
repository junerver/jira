import { useHttp } from "utils/http";
import { User } from "types/user";
import { useQuery } from "react-query";

//用于查询用户
export const useUsers = (param?: Partial<User>) => {
    const client = useHttp();
    // const { run, ...result } = useAsync<User[]>()
    // useMount(() => {
    //   run(client('users'))
    // });
    return useQuery<User[]>(["users", param], () => client("users", param));
};