import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [requiredFirstname, setRequiredFirstname] = useState('');

  return (
    <AppContext.Provider value={{ requiredFirstname, setRequiredFirstname }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
export default AppContext