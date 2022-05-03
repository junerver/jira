import { Button, Card, Divider } from 'antd';
import React, { useState } from 'react'
import RegisterScreen from 'unauthorized-app/register'
import LoginScreen from './login';
import styled from '@emotion/styled';
import logo from 'assets/logo.svg'
import left from 'assets/left.svg'
import right from 'assets/right.svg'

export const UnauthorizedApp = () => {
    const [isRegister, setIsRegister] = useState(false);
    return (
        <Container>
            <Header />
            <Background />
            <ShadowCard>
                <Title>
                    {isRegister ? '请注册' : '请登录'}
                </Title>
                {isRegister ? <RegisterScreen /> : <LoginScreen />}
                <Divider />
                <a onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? '已经有账号了，直接登录' : '没有帐号？去注册'}
                </a>
            </ShadowCard>
        </Container>
    )
}

export const LongButton = styled(Button)`
    width: 100%;
`

const Background = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: left bottom, right bottom;
    background-size: calc(((100vw-40rem)/2)-3.2rem),calc(((100vw-40rem)/2)-3.2rem),cover;
    background-image: url(${left}),url(${right});
`

const Title = styled.h2`
    margin-bottom: 2.4rem;
    color: rgb(94,108,132);
`

const Header = styled.header`
    background: url(${logo}) no-repeat center;
    padding: 5rem 0;
    background-size: 8rem;
    width: 100%;
`

const ShadowCard = styled(Card)`
    width: 40rem;
    min-height: 45rem;
    padding: 3.2rem 4rem;
    border-radius: 0.3rem;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    text-align: center;
`


// styled.div 这种用法只能用于原生html标签
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    justify-content: center;
    `
