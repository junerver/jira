
import { AuthorizedApp } from 'authorized-app';
import ErrorBoundary from 'components/error-boundary';
import { FullPageError } from 'components/lib';
import { useAuth } from 'context/auth-context';
import { UnauthorizedApp } from 'unauthorized-app';
import './App.css';


function App() {
  const { user } = useAuth()
  return (
    <div className='App'>
      <ErrorBoundary fallbackRender={FullPageError}>
        {user ? <AuthorizedApp /> : <UnauthorizedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
