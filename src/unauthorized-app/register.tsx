import { FormEvent } from 'react'
import { useAuth } from 'context/auth-context';
import { Form, Input, Button } from 'antd';

const apiUrl = process.env.REACT_APP_API_URL;
const RegisterScreen = () => {
    const { register, user } = useAuth()
    const handleSubmit = ({ username, password }: { username: string, password: string }) => {

        register({ username, password })
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

            <Form.Item>
                <Button htmlType='submit' type='primary' >注册</Button>
            </Form.Item>

        </Form>
    )
}

export default RegisterScreen