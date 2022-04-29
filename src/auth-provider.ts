//真实环境中如果使用了 firebase 就不需要要用到这个文件了

import { User } from "./screens/project-list/search-panel";

const localStorageKey = '__auth_provider_token__';
const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || '');
    return user;
}
export const login = (data: { username: string, password: string }) => {
    return fetch(
        `${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async (res) => {
        if (res.ok) {
            return handleUserResponse(await res.json());
        } else {
            // throw new Error('Login failed');
            return Promise.reject('Login failed')
        }
    });
}

export const register = (data: { username: string, password: string }) => {
    return fetch(
        `${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    ).then(async (res) => {
        if (res.ok) {
            return handleUserResponse(await res.json());
        } else {
            return Promise.reject('Register failed')
        }
    });
}

export const logout = async () => window.localStorage.removeItem(localStorageKey);