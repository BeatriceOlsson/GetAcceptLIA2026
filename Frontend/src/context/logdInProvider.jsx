import { useMemo, useState } from "react";
import { LogdInContext } from "./logedInContext";
import FetchBackend from "../components/fetchBackend";

const getStoredExpiresAt = () => {
  const value = Number(localStorage.getItem("session_expires_at"));
  return Number.isFinite(value) ? value : 0;
};

export function LogdInProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const [isLogdIn, setIsLogdIn] = useState(() => {
    const expiresAt = getStoredExpiresAt();
    return expiresAt > Date.now();
  });

  const [localTokenExpiers, setLocalTokenExpiers] = useState(() => {
    return getStoredExpiresAt();
  });

  const refrechLogIn = async () => {
    try {
      const responseNode = await FetchBackend({
        url: "/isLogdIn/refresh",
        crud: "GET",
      });

      if (responseNode instanceof Error) {
        console.error(responseNode.message || "Okänt fel uppstog");
        return;
      }

      logdIn(responseNode.expireCookie);
    } catch (error) {
      console.error("Något gick fel: " + error);
      logOut();
    }
  };

  const logdIn = (cookieExpiresAt) => {
    const expiresAt = Number(cookieExpiresAt);
    if (!expiresAt || Number.isNaN(expiresAt)) return;

    localStorage.setItem("session_expires_at", String(expiresAt));
    setLocalTokenExpiers(expiresAt);
    setIsLogdIn(expiresAt > Date.now());
    setLoading(false);
  };

  const logOut = () => {
    localStorage.removeItem("session_expires_at");
    setLocalTokenExpiers(0);
    setIsLogdIn(false);
    setLoading(false);
  };

  const getToken = () => {
    return localTokenExpiers;
  };

  const value = useMemo(
    () => ({
      isLogdIn,
      logdIn,
      logOut,
      loading,
      getToken,
      refrechLogIn,
    }),
    [isLogdIn, loading, localTokenExpiers],
  );

  return (
    <LogdInContext.Provider value={value}>{children}</LogdInContext.Provider>
  );
}
