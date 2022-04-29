
import { AuthorizedApp } from 'authorized-app';
import { useAuth } from 'context/auth-context';
import { UnauthorizedApp } from 'unauthorized-app';
import './App.css';


function App() {
  const { user } = useAuth()
  return (
    <div className='App'>
      {user ? <AuthorizedApp /> : <UnauthorizedApp />}
    </div>
  );
}

export default App;
