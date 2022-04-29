import qs from 'qs';
import * as auth from 'auth-provider';
import { useAuth } from 'context/auth-context';

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
    data?: object;
    token?: string;
}
export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': data ? 'application/json' : '',
            Authorization: token ? `Bearer ${token}` : ''
        },
        ...customConfig
    }

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
    const { user } = useAuth()
    // return ([endpoint, config]: [string, Config]) => http(endpoint, { ...config, token: user?.token });

    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token });
}