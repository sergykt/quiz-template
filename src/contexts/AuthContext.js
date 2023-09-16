import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  const initialLogState = !!token;

  const [loggedIn, setLoggedIn] = useState(initialLogState);

  const logIn = () => {
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('accessToken');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, }}>
      {children}
    </AuthContext.Provider>
  );
};