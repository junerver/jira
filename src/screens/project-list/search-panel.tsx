import { Input, Select } from "antd";
import React, { PropsWithChildren } from "react";

export type SearchParams = {
    name?: string;
    personId?: string;
}
export type User = {
    id: string;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}

type SearchPanelProps = {
    param: SearchParams;
    users: User[];
    setParam: (param: SearchParams) => void;
};
const SearchPanel: React.FC<PropsWithChildren<SearchPanelProps>> = ({ users, param, setParam }) => {

    return (
        <div>
            <form>
                <Input
                    type="text"
                    value={param.name}
                    onChange={(e) => setParam({ ...param, name: e.target.value })}
                />
                <Select
                    value={param.personId}
                    onChange={(value) => setParam({ ...param, personId: value })}>

                    <Select.Option value="">负责人</Select.Option>

                    {users.map((user: User) => (
                        <Select.Option key={user.id} value={user.id}>
                            {user.name}
                        </Select.Option>
                    ))}
                </Select>
            </form>
        </div>
    );
}

export default SearchPanel