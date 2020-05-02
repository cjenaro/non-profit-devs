import React, { createContext, useState } from "react";

export const UserContext = createContext();
const LocalStateProvider = UserContext.Provider;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <LocalStateProvider value={[user, setUser]}>{children}</LocalStateProvider>
  );
};
