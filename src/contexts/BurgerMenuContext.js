import { createContext, useContext, useState } from 'react';

const BurgerMenuContext = createContext({});

export const useBurger = () => useContext(BurgerMenuContext);

export const BurgerProvider = ({ children }) => {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <BurgerMenuContext.Provider value={{ menuActive, setMenuActive }}>
      {children}
    </BurgerMenuContext.Provider>
  );
};