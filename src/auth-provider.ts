import { User } from "./screens/project-list/search-panel";

//localStorage 中用于保存token的key
const localStorageKey = '__auth_provider_token__';
//
const apiUrl = process.env.REACT_APP_API_URL;

//从localStorage中获取token
export const getToken = () => window.localStorage.getItem(localStorageKey);

//从数据中获取token，并保存到localStorage中
export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || '');
    return user;
}

//传入用户名与密码 调用登录接口
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
            //json -> {"user":{"id":2087569429,"name":"jira","token":"MjA4NzU2OTQyOQ=="}}
            return handleUserResponse(await res.json());
        } else {
            // throw new Error('Login failed');
            return Promise.reject('Login failed')
        }
    });
}

//传入用户名密码 调用注册接口
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

//退出登录，清除localStorage中的token
export const logout = async () => window.localStorage.removeItem(localStorageKey);