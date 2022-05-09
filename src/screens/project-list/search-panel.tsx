import styled from "@emotion/styled";
import { Form, Input, Select } from "antd";
import { UserSelect } from "components/user-select";
import React, { PropsWithChildren } from "react";
import { Project } from "./list";


export type User = {
    id: number;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}

type SearchPanelProps = {
    param: Partial<Pick<Project, 'name' | 'personId'>>;
    users: User[];
    setParam: (param: SearchPanelProps['param']) => void;
};
const SearchPanel: React.FC<PropsWithChildren<SearchPanelProps>> = ({ users, param, setParam }) => {

    return (
        <div>
            <Form
                style={{ marginBottom: "2rem" }}
                layout="inline">
                <Form.Item>
                    <Input
                        placeholder="项目名称"
                        type="text"
                        value={param.name}
                        onChange={(e) => setParam({ ...param, name: e.target.value })}
                    />
                </Form.Item>
                <Form.Item>
                    <UserSelect
                        value={param.personId}
                        onChange={(value) =>
                            setParam({ ...param, personId: value })}
                        defaultOptionName="选择负责人"
                    />
                </Form.Item>

            </Form>
        </div>
    );
}

export default SearchPanel