import React, { useState } from 'react'
import * as auth from '../auth-provider'
import { User } from '../screens/project-list/search-panel'

interface AuthForm {
    username: string,
    password: string
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
    const [user, setUser] = useState<User | null>(null)

    //全部变成promise
    const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
    //传入参数与后一个单语句的函数传入参数一致的话，可以消参 point free
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))
    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

//限定useAuth钩子的使用范围必须在AuthProvider下
export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
}