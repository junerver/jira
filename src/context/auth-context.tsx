import React, { useCallback, useState } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/search-panel'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/use-async'
import { FullPageError, FullPageLoading } from 'components/lib'
import * as authStore from 'store/auth.slice'

import { bootstrap, selectUser } from 'store/auth.slice'
import { useAppDispatch } from 'store'
import { useSelector } from 'react-redux'

//声明登录注册使用的关键对象
export interface AuthForm {
    username: string,
    password: string
}

//在app渲染时初始化用户拿到user对象
export const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        //localstroge存在token，请求获取用户信息
        //json -> {"user":{"id":2087569429,"name":"jira","token":"MjA4NzU2OTQyOQ=="}}
        const data = await http('me', { token })
        user = data.user
    }
    return user
}

//创建一个Context
const AuthContext = React.createContext<{
    user: User | null,
    register: (data: AuthForm) => Promise<void>,
    login: (data: AuthForm) => Promise<void>,
    logout: () => Promise<void>
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

//暴露AuthProvider组件
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: user, error, isLoading, isIdle, isError, run, setData: setUser } = useAsync<User | null>()
    const dispatch = useAppDispatch()
    //挂载时获取用户信息
    useMount(() => {
        run(dispatch(bootstrap()));
    });
    if (isIdle || isLoading) {
        //显示loading
        return <FullPageLoading />
    }
    if (isError) {
        //显示错误
        return <FullPageError error={error} />
    }
    return <div>{children}</div>;
}

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const user = useSelector(selectUser);
    const login = useCallback(
        (form: AuthForm) => dispatch(authStore.login(form)),
        [dispatch]
    );
    const register = useCallback(
        (form: AuthForm) => dispatch(authStore.register(form)),
        [dispatch]
    );
    const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
    return {
        user,
        login,
        register,
        logout,
    };
};