import qs from 'qs';
import * as auth from 'auth-provider';
import { useAuth } from 'context/auth-context';

const apiUrl = process.env.REACT_APP_API_URL;

//扩展Request
interface Config extends RequestInit {
    data?: object;
    token?: string;
}

//封装fetch
export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': data ? 'application/json' : '',
            Authorization: token ? `Bearer ${token}` : ''
        },
        ...customConfig
    }
    //判断method
    if (config.method.toUpperCase() === 'GET') {
        endpoint = `${endpoint}?${qs.stringify(data)}`;
    } else {
        config.body = JSON.stringify(data || {});
    }

    return window.fetch(`${apiUrl}/${endpoint}`, config)
        .then(async (res) => {
            //restful中 401 是未授权
            if (res.status === 401) {
                await auth.logout();
                window.location.reload();
                return Promise.reject({ message: 'Unauthorized,请重新登录' });
            }
            const data = await res.json();
            if (res.ok) {
                return data;
            } else {
                return Promise.reject(data);
            }
        })
}

export const useHttp = () => {
    //通过useAuth钩子拿到用户信息
    const { user } = useAuth()
    // return ([endpoint, config]: [string, Config]) => http(endpoint, { ...config, token: user?.token });
    //封装网络请求，给每个请求加上token字段
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token });
}