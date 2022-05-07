import styled from "@emotion/styled";
import { CenterButton, Row } from "components/lib";
import { useAuth } from "context/auth-context";
import ProjectListScreen from "screens/project-list";
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from "antd";
import { Navigate, Route, Routes } from 'react-router'
import { ProjectScreen } from "screens/project";
import { BrowserRouter } from 'react-router-dom';
import { resetRoute } from "utils";

export const AuthorizedApp = () => {

    return (
        <Container>
            <PageHeader />
            <Main>
                <BrowserRouter>
                    <Routes>
                        {/* 项目列表 */}
                        <Route index element={<Navigate to="/projects" />} />
                        <Route path="/projects" element={<ProjectListScreen />} />
                        <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
                    </Routes>
                </BrowserRouter>

            </Main>
        </Container>);
}

const PageHeader = () => {
    const { logout, user } = useAuth()
    return (
        <Header between={true}>
            <HeaderLeft gap={true}>
                <CenterButton type="link" onClick={resetRoute}>
                    <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
                </CenterButton>

                <h3>项目</h3>
                <h3>用户</h3>
            </HeaderLeft>
            <HeaderRight>
                <Dropdown overlay={(
                    <Menu>
                        <Menu.Item key='logout'>
                            <Button type="link" onClick={() => logout()}>退出</Button>
                        </Menu.Item>
                    </Menu>
                )}>
                    <Button type="link" onClick={e => e.preventDefault()}>Hi,{user?.name}</Button>

                </Dropdown>

            </HeaderRight>
        </Header>
    )
}

//使用grid作为布局系统
const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;
    height: 100vh;
    `

//grid-area 用于为grid区域起名
const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main``