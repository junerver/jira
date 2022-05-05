import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import ProjectListScreen from "screens/project-list";

export const AuthorizedApp = () => {
    const { logout } = useAuth()
    return (<Container>
        <Header between={true}>
            <HeaderLeft gap={true}>
                <h3>logo</h3>
                <h3>项目</h3>
                <h3>用户</h3>
            </HeaderLeft>
            <HeaderRight>
                <button onClick={() => logout()}> 退出 </button>
            </HeaderRight>
        </Header>
        <Main>
            <ProjectListScreen />
        </Main>
    </Container>);
}

//使用grid作为布局系统
const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;
    height: 100vh;
    `

//grid-area 用于为grid区域起名
const Header = styled(Row)``
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``

const Main = styled.main``