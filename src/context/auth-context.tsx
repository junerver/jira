import React, { useState } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/search-panel'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/use-async'
import { FullPageError, FullPageLoading } from 'components/lib'

//声明登录注册使用的关键对象
interface AuthForm {
    username: string,
    password: string
}

//在app渲染时初始化用户拿到user对象
const bootstrapUser = async () => {
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

    //暴露给全局组件使用的登录、注册、退出方法
    //全部变成promise
    const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
    //传入参数与后一个单语句的函数传入参数一致的话，可以消参 point free
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))
    //挂载时获取用户信息
    useMount(() => {
        run(bootstrapUser())
    })
    if (isIdle || isLoading) {
        //显示loading
        return <FullPageLoading />
    }

    if (isError) {
        //显示错误
        return <FullPageError error={error} />
    }

    //通过value属性赋值给context
    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

//通过该钩子方便子组件拿到AuthContext，从而使用其内部暴露的方法
export const useAuth = () => {
    //限定useAuth钩子的使用范围必须在AuthProvider下，
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
}