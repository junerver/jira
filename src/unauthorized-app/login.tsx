import { useAuth } from 'context/auth-context';
import { Form, Input, Button } from 'antd';
import { LongButton } from 'unauthorized-app';
import { type } from '@testing-library/user-event/dist/type';
import { useAsync } from 'utils/use-async';


export type OnErrorProps = {
    onError: (error: Error) => void;
}

const LoginScreen = ({ onError }: OnErrorProps) => {
    const { login, user } = useAuth()

    const { run, isLoading } = useAsync()
    //根据 Form.Item的name决定的这个values是什么
    const handleSubmit = (values: { username: string, password: string }) => {
        const { username, password } = values
        run(login({ username, password }).catch(onError))
    }

    return (
        <Form onFinish={handleSubmit} >
            {user ? <div>登录成功，用户名为：{user?.name}</div> : null}
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                <Input placeholder='用户名' type="text" id="username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input placeholder='密码' type="password" id="password" />
            </Form.Item>
            <Form.Item>
                <LongButton loading={isLoading} htmlType='submit' type='primary'>登录</LongButton>
            </Form.Item>
        </Form>
    )
}

export default LoginScreen