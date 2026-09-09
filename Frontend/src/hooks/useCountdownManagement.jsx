import { useCallback, useEffect, useRef, useState } from "react";

const getNow = () => Date.now();

export default function useCountdownManagement({
  timeoutMs,
  logdin = true,
  ignoreActive,
}) {
  const timeoutRef = useRef(null);
  const countdownRef = useRef(null);
  const showingPopUppRef = useRef(false);
  const lastActiveRef = useRef(0);
  const [showPopUpp, setShowPopUpp] = useState(false);
  const [minLeft, setMinLeft] = useState(0);

  const warningTime = 5 * 60 * 1000;

  useEffect(() => {
    showingPopUppRef.current = showPopUpp;
  }, [showPopUpp]);

  const clearTime = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (countdownRef.current) {
      window.clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    setShowPopUpp(false);
  }, []);

  const startCountdown = useCallback(() => {
    setMinLeft(warningTime);

    countdownRef.current = window.setInterval(() => {
      setMinLeft((prevMin) => {
        const nextMin = Math.max(0, prevMin - 1000);

        if (nextMin <= 0) {
          window.clearInterval(countdownRef.current);
        }
        return nextMin;
      });
    }, 1000);
  }, [warningTime]);

  const timeUppdate = useCallback(() => {
    if (showingPopUppRef.current) {
      return;
    }

    clearTime();

    if (!logdin || timeoutMs <= 0) {
      return;
    }

    const timeToWarning = Math.max(0, timeoutMs - warningTime);
    const delayTime = timeToWarning > 0 ? timeToWarning : 0;

    timeoutRef.current = window.setTimeout(() => {
      setShowPopUpp(true);
      startCountdown();
    }, delayTime);
  }, [clearTime, logdin, timeoutMs, warningTime, startCountdown]);

  useEffect(() => {
    if (!logdin) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      clearTime();
      return;
    }

    timeUppdate();

    const handleActivity = () => {
      if (showingPopUppRef.current) {
        return;
      }
      if (ignoreActive === true) {
        return;
      }

      const now = getNow();

      if (now - lastActiveRef.current < 2000) {
        return;
      }

      lastActiveRef.current = now;

      timeUppdate();
    };

    const event = ["mousedown", "keydown", "mousemove", "scroll"];
    event.forEach((event) => document.addEventListener(event, handleActivity));

    return () => {
      event.forEach((event) =>
        document.removeEventListener(event, handleActivity),
      );
    };
  }, [logdin, timeUppdate, ignoreActive]);

  const popUppLogOut = useCallback(() => {
    showingPopUppRef.current = false;
    setShowPopUpp(false);
    clearTime();
  }, [clearTime]);

  const popUppStay = useCallback(() => {
    showingPopUppRef.current = false;
    clearTime();
    timeUppdate();
  }, [clearTime, timeUppdate]);

  return {
    clearTime,
    timeUppdate,
    popUppLogOut,
    popUppStay,
    minLeft,
    showPopUpp,
  };
}
