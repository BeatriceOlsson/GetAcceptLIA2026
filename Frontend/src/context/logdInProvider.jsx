import { useMemo, useState } from "react";
import { LogdInContext } from "./logedInContext";

export function LogdInProvider({ children }) {
  const [isLogdIn, setIsLogdIn] = useState(() => {
    const cookieExpiresAt = localStorage.getItem("session_expires_at");
    if (!cookieExpiresAt) return false;
    return Date.now() < Number(cookieExpiresAt);
  });
  const [loading, setLoading] = useState(false);

  const logdIn = (cookieExpiresAt) => {
    if (!cookieExpiresAt) return;
    localStorage.setItem("session_expires_at", cookieExpiresAt);
    setIsLogdIn(true);
    setLoading(false);
  };

  const logOut = () => {
    localStorage.removeItem("session_expires_at");
    setIsLogdIn(false);
    setLoading(false);
  };

  const getToken = () => {
    return localStorage.getItem("session_expires_at");
  };

  const value = useMemo(
    () => ({ isLogdIn, logdIn, logOut, loading, getToken }),
    [isLogdIn, loading],
  );

  return (
    <LogdInContext.Provider value={value}>{children}</LogdInContext.Provider>
  );
}
