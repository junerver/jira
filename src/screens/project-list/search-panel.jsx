import React, { useEffect, useState } from "react";

const SearchPanel = (props) => {

    const { users, param, setParam } = props

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
                    {users.map((user) => (
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