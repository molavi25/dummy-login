import {
  useEffect,
  useState,
} from 'react';

import {
  Home,
  Login,
  MainHeader,
} from 'components';

import { AuthContext } from 'context';

function App() {
  const [isLoggedIn, setIsLoggedIn] =
    useState(
      localStorage.getItem(
        'isLoggedIn',
      ),
    );

  useEffect(() => {
    if (
      localStorage.getItem(
        'isLoggedIn',
      ) === '1'
    ) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (
    email,
    password,
  ) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem(
      'isLoggedIn',
      '1',
    );
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem(
      'isLoggedIn',
    );
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn }}>
      <MainHeader
        onLogout={logoutHandler}
      />
      <main>
        {!isLoggedIn && (
          <Login
            onLogin={loginHandler}
          />
        )}
        {isLoggedIn && (
          <Home
            onLogout={logoutHandler}
          />
        )}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
