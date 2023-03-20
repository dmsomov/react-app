import { createContext } from 'react';

import { useStore } from '../hooks/useStore';

export const StoreContext = createContext(null);

export const WithStoreContext = ({ children }) => {
  const value = useStore();

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
