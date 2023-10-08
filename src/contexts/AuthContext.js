import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  const initialUsername = localStorage.getItem('username');
  const initialActive = JSON.parse(localStorage.getItem('isactive'));
  const initialState = !!accessToken;

  const [username, setUsername] = useState(initialUsername)
  const [loggedIn, setLoggedIn] = useState(initialState);
  const [isActive, setActive] = useState(initialActive);

  const logIn = (response) => {
    const { accessToken, username, isactive: isActiveRaw } = response;
    console.log(accessToken);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('username', username);
    localStorage.setItem('isactive', isActiveRaw);
    setActive(JSON.parse(isActiveRaw));
    setLoggedIn(true);
    setUsername(username);
  };

  const logOut = () => {
    setLoggedIn(false);
    setUsername(null);
    setActive(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('isactive');
  };

  const activate = () => {
    if (!isActive) {
      localStorage.setItem('isactive', 'true');
      setActive(true);
      return true;
    }
    return false;
  }

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, username, activate, isActive }}>
      {children}
    </AuthContext.Provider>
  );
};