import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { useAuth } from 'context/auth-context'
import ProjectListScreen from 'screens/project-list'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from 'antd'
import { Navigate, Route, Routes } from 'react-router'
import { ProjectScreen } from 'screens/project'

import { resetRoute } from 'utils'
import { ProjectModal } from 'screens/project-list/project-modal'
import { ProjectPopover } from 'components/project-popover'
import { UserPopover } from 'components/user-popover'

const AuthorizedApp = () => {
  //控制模态的显示还是隐藏
  return (
    <Container>
      <PageHeader />
      <Main>
        <Routes>
          {/* 项目列表 */}
          <Route index element={<Navigate to="/projects" replace />} />
          <Route path="/projects" element={<ProjectListScreen />} />
          <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
        </Routes>
      </Main>
      <ProjectModal />
    </Container>
  )
}

export default AuthorizedApp

//页头
const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button
          style={{ display: 'flex', alignItems: 'center' }}
          type="link"
          onClick={resetRoute}
        >
          <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
        </Button>
        <ProjectPopover />
        <UserPopover />
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

//页头右侧用户
const User = () => {
  const { logout, user } = useAuth()
  return (
    <Dropdown
      overlay={
        <Menu
          items={[
            {
              key: 'logout',
              label: '退出',
              onClick: logout,
            },
          ]}
        ></Menu>
      }
    >
      <Button type="link" onClick={(e) => e.preventDefault()}>
        Hi,{user?.name}
      </Button>
    </Dropdown>
  )
}

//使用grid作为布局系统
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

//grid-area 用于为grid区域起名
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main`
  display: flex;
  overflow: hidden;
`
