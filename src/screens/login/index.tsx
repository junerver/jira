import { useRef, FormEvent } from 'react'

const apiUrl = process.env.REACT_APP_API_URL;
const LoginScreen = () => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        //阻止默认行为
        e.preventDefault()
        console.log('submit')
        const username = (e.currentTarget.elements[0] as HTMLInputElement).value
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value
        login({ username, password })
    }

    const login = (params: { username: string, password: string }) => {
        fetch(
            `${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }
        ).then(async (res) => {
            if (res.ok) {
                const result = await res.json()
            }
        });
    }

    return (
        <form onSubmit={handleSubmit}>
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