import { Card } from 'antd';
import React, { useState } from 'react'
import RegisterScreen from 'unauthorized-app/register'
import LoginScreen from './login';
export const UnauthorizedApp = () => {
    const [isRegister, setIsRegister] = useState(false);
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card>
                {isRegister ? <RegisterScreen /> : <LoginScreen />}
                <button onClick={() => setIsRegister(!isRegister)}>
                    切换到{isRegister ? 'Login' : 'Register'}
                </button>
            </Card>
        </div>
    )
}