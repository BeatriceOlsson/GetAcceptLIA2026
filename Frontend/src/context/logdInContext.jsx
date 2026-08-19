import { createContext, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "getaccept_token";
const LogdInContext = createContext(null);

export function LogdInProvider({ children }) {
  const [isLogdIn, setIsLogdIn] = useState(() => {
    const token = localStorage.getItem(STORAGE_KEY);
    return !!token;
  });
  const [loading, setLoading] = useState(false);

  const logdIn = (token) => {
    if (!token) return;
    localStorage.setItem(STORAGE_KEY, token);
    setIsLogdIn(true);
    setLoading(false);
  };

  const logOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsLogdIn(false);
    setLoading(false);
  };

  const getToken = () => {
    return localStorage.getItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({ isLogdIn, logdIn, logOut, loading, getToken }),
    [isLogdIn, loading],
  );

  return (
    <LogdInContext.Provider value={value}>{children}</LogdInContext.Provider>
  );
}

export function useLogdIn() {
  const context = useContext(LogdInContext);

  if (!context) {
    throw new Error("useLogdIn must be used inside LogdInProvider");
  }

  return context;
}
