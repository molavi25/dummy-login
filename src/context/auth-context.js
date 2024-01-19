import {
  createContext,
  useEffect,
  useState,
} from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

const AuthContextProvider = ({
  children,
}) => {
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
    localStorage.removeItem(
      'isLoggedIn',
    );
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthContext,
  AuthContextProvider,
};
