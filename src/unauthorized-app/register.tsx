import { FormEvent } from 'react'
import { useAuth } from 'context/auth-context';
import { Form, Input, Button } from 'antd';
import { LongButton } from 'components/lib';
import { OnErrorProps } from './login';
import { useAsync } from 'utils/use-async';

const apiUrl = process.env.REACT_APP_API_URL;
const RegisterScreen = ({ onError }: OnErrorProps) => {
    const { register, user } = useAuth()
    //需要try-catch捕获异常时配置onError
    const { run, isLoading } = useAsync(undefined, { throwOnError: true })
    //通过try-catch捕获Promise异常必须要使用async await，不然是无法捕获到的
    const handleSubmit = async ({ cpassword, ...values }: { username: string, password: string, cpassword: string }) => {
        if (cpassword !== values.password) {
            onError(new Error('两次输入的密码不一致'))
            return
        }
        try {
            await run(register(values));
        } catch (error) {
            onError(error as Error);
        }
    }
    return (
        <Form onFinish={handleSubmit}>
            {user ? <div>注册成功，用户名为：{user?.name}</div> : null}


            <Form.Item name="username" rules={[{ required: true, message: '请输入密码' }]}>
                <Input placeholder='用户名' type="text" id="username" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input placeholder='密码' type="password" id="password" />
            </Form.Item>

            <Form.Item name="cpassword" rules={[{ required: true, message: '请确认密码' }]}>
                <Input placeholder='确认密码' type="password" id="cpassword" />
            </Form.Item>

            <Form.Item>
                <LongButton loading={isLoading} htmlType='submit' type='primary' >注册</LongButton>
            </Form.Item>

        </Form>
    )
}

export default RegisterScreen