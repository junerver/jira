import React, { PropsWithChildren } from "react";

export type SearchParams = {
    name?: string;
    personId?: string;
}
export type User = {
    id: string;
    name: string;
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
                <input
                    type="text"
                    value={param.name}
                    onChange={(e) => setParam({ ...param, name: e.target.value })}
                />
                <select
                    value={param.personId}
                    onChange={(e) => setParam({ ...param, personId: e.target.value })}
                >
                    <option value="">Select a person</option>
                    {users.map((user: User) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </form>
        </div>
    );
}

export default SearchPanel