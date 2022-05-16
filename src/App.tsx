import ErrorBoundary from 'components/error-boundary'
import { FullPageError } from 'components/lib'
import { useAuth } from 'context/auth-context'
import './App.css'
import React, { Suspense } from 'react'
import { Spin } from 'antd'

//懒加载AuthorizedApp，注意懒加载必须是default导出
const LazyAuthorizedApp = React.lazy(() => import('authorized-app'))
const LazyUnauthorizedApp = React.lazy(() => import('unauthorized-app'))

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageError}>
        <Suspense fallback={<Spin size={'large'} />}>
          {user ? <LazyAuthorizedApp /> : <LazyUnauthorizedApp />}
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default App
