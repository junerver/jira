import styled from "@emotion/styled";
import { useAuth } from "context/auth-context";
import ProjectListScreen from "screens/project-list";

export const AuthorizedApp = () => {
    const { logout } = useAuth()
    return (<Container>
        <Header>
            <HeaderLeft>
                <h3>logo</h3>
                <h3>项目</h3>
                <h3>用户</h3>
            </HeaderLeft>
            <HeaderRight>
                <button onClick={() => logout()}> 退出 </button>
            </HeaderRight>
        </Header>
        <Nav>nav</Nav>
        <Main>
            <ProjectListScreen />
        </Main>
        <Aside>aside</Aside>
        <Footer>footer</Footer>

    </Container>);
}

//使用grid作为布局系统
const Container = styled.div`
    //使用grid
    display: grid;
    //列的宽度
    grid-template-columns: 20rem 1fr 20rem;
    //行的高度
    grid-template-rows: 6rem 1fr 6rem;
    //网格排布
    grid-template-areas:
        "header header header"
        "nav main aside"
        "footer footer footer";
    //每个区域的间隔
    grid-gap: 1rem;
    height: 100vh;
    `

//grid-area 用于为grid区域起名
const Header = styled.header`
    grid-area: header;
    display: flex;
    //默认flex就是横向排列
    flex-direction:row;
    align-items:center;
    //子节点从两侧开始均匀分布
    justify-content:space-between;
    `
const HeaderLeft = styled.div`
    display:flex;
    align-items: center;
`
const HeaderRight = styled.div`
    display:flex;
    `

const Main = styled.main`grid-area: main;`
const Footer = styled.footer`grid-area: footer;`
const Nav = styled.nav`grid-area: nav;`
const Aside = styled.aside`grid-area: aside;`

// const PageHeader = styled.header`
//     height: 6rem;
//     background-color: gray;
// `
// const Main = styled.main`
//     height:calc(100vh - 6rem);
// `