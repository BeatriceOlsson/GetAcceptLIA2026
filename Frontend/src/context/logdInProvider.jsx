import { useEffect, useMemo, useState } from "react";
import { LogdInContext } from "./logedInContext";
import FetchBackend from "../components/fetchBackend";

export function LogdInProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLogdIn, setIsLogdIn] = useState(() => {
    const cookieExpiresAt = localStorage.getItem("session_expires_at");
    if (!cookieExpiresAt) return false;
    return Date.now() < Number(cookieExpiresAt);
  });

  const refrechLogIn = async () => {
    try {
      const responseNode = await FetchBackend({
        url: "/isLogdIn/refresh",
        crud: "GET",
      });

      if (responseNode instanceof Error) {
        console.log(responseNode.message || "Okänt fel uppstog");
        return;
      }

      logdIn(responseNode.expireCookie);
    } catch (error) {
      console.error("Något gick fel: " + error);
      logOut();
    }
  };

  useEffect(() => {
    if (!isLogdIn) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTimeLeft(0);
      return;
    }

    const checkExpiration = () => {
      const cookieExpiresAtRaw = localStorage.getItem("session_expires_at");
      if (!cookieExpiresAtRaw) {
        setTimeLeft(0);
        setIsLogdIn(false);
        return;
      }

      const cookieExpiresAt = Number(cookieExpiresAtRaw);
      const now = Date.now();

      if (now >= cookieExpiresAt) {
        setTimeLeft(0);
        setIsLogdIn(false);
      } else {
        const actualTime = Math.max(0, Math.floor(cookieExpiresAt - now));
        setTimeLeft(actualTime);
      }
    };

    checkExpiration();
    const intervalId = window.setInterval(checkExpiration, 1000);

    return () => window.clearInterval(intervalId);
  }, [isLogdIn]);

  const logdIn = (cookieExpiresAt) => {
    if (!cookieExpiresAt) return;
    localStorage.setItem("session_expires_at", String(cookieExpiresAt));
    setIsLogdIn(true);
    setLoading(false);
  };

  const logOut = () => {
    localStorage.removeItem("session_expires_at");
    setTimeLeft(0);
    setIsLogdIn(false);
    setLoading(false);
  };

  const getToken = () => {
    return timeLeft;
  };

  const value = useMemo(
    () => ({
      isLogdIn,
      logdIn,
      logOut,
      loading,
      timeLeft,
      getToken,
      refrechLogIn,
    }),
    [isLogdIn, loading, timeLeft],
  );

  return (
    <LogdInContext.Provider value={value}>{children}</LogdInContext.Provider>
  );
}
