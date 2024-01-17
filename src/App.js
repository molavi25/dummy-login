import React, {
  useEffect,
  useState,
} from 'react';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import MainHeader from './components/MainHeader/MainHeader';

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
    <React.Fragment>
      <MainHeader
        isAuthenticated={isLoggedIn}
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
    </React.Fragment>
  );
}

export default App;
