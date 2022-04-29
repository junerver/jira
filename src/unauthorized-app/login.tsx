import { FormEvent } from 'react'
import { useAuth } from 'context/auth-context';

const apiUrl = process.env.REACT_APP_API_URL;
const LoginScreen = () => {
    const { login, user } = useAuth()
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        //阻止默认行为
        e.preventDefault()
        console.log('submit')
        const username = (e.currentTarget.elements[0] as HTMLInputElement).value
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value
        login({ username, password })
    }



    return (
        <form onSubmit={handleSubmit}>
            {user ? <div>登录成功，用户名为：{user?.name}</div> : null}

            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
            </div>
            <button type='submit'>登录</button>
        </form>
    )
}

export default LoginScreen