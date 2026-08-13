import { createContext, useContext, useEffect, useState } from "react";

const LogdInContext = createContext();

export function LogInProvider({ children }) {
  const [isLogdIn, setIsLogdIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("getaccept_token");

    if (token) {
      setIsLogdIn(true);
    } else {
      setIsLogdIn(false);
    }
  }, []);

  const logdIn = (token) => {
    localStorage.setItem("getaccept_token", token);
    setIsLogdIn(true);
  };

  return (
    <LogdInContext.Provider value={logdIn}>{children}</LogdInContext.Provider>
  );
}

export function LogdIn() {
  return useContext(LogdInContext);
}
