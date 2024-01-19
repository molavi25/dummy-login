import {
  Home,
  Login,
  MainHeader,
} from 'components';
import { AuthContext } from 'context';
import { useContext } from 'react';

function App() {
  const ctx = useContext(AuthContext);
  return (
    <>
      <MainHeader />
      <main>
        {ctx.isLoggedIn ? (
          <Home />
        ) : (
          <Login />
        )}
      </main>
    </>
  );
}

export default App;
