import { createContext, useContext, useState } from 'react';
//import userService from '../api/services/userService';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  const initialUsername = localStorage.getItem('username');
  const initialState = !!accessToken;

  const [username, setUsername] = useState(initialUsername)
  const [loggedIn, setLoggedIn] = useState(initialState);

  const logIn = (response) => {
    const { accessToken, username } = response;
    console.log(accessToken);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('username', username);
    setLoggedIn(true);
    setUsername(username);
  };

  const logOut = () => {
    setLoggedIn(false);
    setUsername(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, username }}>
      {children}
    </AuthContext.Provider>
  );
};