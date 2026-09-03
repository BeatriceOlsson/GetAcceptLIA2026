import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { LogdInContext } from "../../context/logedInContext";
import { PopUppWindow } from "./popUppWindow";
import { BlueButton } from "./blueButton";
import { MsToMinets } from "./msToMinets";

const getNow = () => Date.now();

function InactivityListener({ timeoutMs = 900000, children }) {
  const { isLogdIn, logOut } = useContext(LogdInContext);
  const timeoutRef = useRef(null);
  const showingPopUppRef = useRef(false);
  const lastActiveRef = useRef(0);
  const popUppTimerRef = useRef(null);
  const [showPopUpp, setShowPopUpp] = useState(false);
  const [minLeft, setMinLeft] = useState(0);
  const countdownRef = useRef(null);

  const warningTime = 5 * 60 * 1000;

  useEffect(() => {
    showingPopUppRef.current = showPopUpp;
  }, [showPopUpp]);

  const clearTime = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (popUppTimerRef.current) {
      window.clearTimeout(popUppTimerRef.current);
      popUppTimerRef.current = null;
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
    clearTime();

    if (isLogdIn) {
      const timeToWarning = timeoutMs - warningTime;
      const delayTime = timeToWarning > 0 ? timeToWarning : 0;
      console.log(timeToWarning);
      timeoutRef.current = window.setTimeout(() => {
        setShowPopUpp(true);
        startCountdown();
      }, delayTime);
    }
  }, [clearTime, isLogdIn, timeoutMs]);

  useEffect(() => {
    if (!isLogdIn) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowPopUpp(false);
      clearTime();
      return;
    }

    timeUppdate();

    const handleActivity = () => {
      if (showingPopUppRef.current) {
        return;
      }

      let now = getNow();

      if (now - lastActiveRef.current < 2000) {
        return;
      }

      lastActiveRef.current = now;

      timeUppdate();
    };

    const event = ["mousedown", "keydown", "mousemove", "scroll"];
    event.forEach((event) => document.addEventListener(event, handleActivity));

    return () => {
      clearTime();
      event.forEach((event) =>
        document.removeEventListener(event, handleActivity),
      );
    };
  }, [isLogdIn, clearTime, timeUppdate]);

  const handelLogOut = () => {
    showingPopUppRef.current = false;
    setShowPopUpp(false);
    clearTime();
    logOut();
  };

  const handelLStayLogdIn = () => {
    showingPopUppRef.current = false;
    setShowPopUpp(false);
    clearTime();
    timeUppdate();
  };

  return (
    <div>
      {showPopUpp && (
        <PopUppWindow
          isOpen={showPopUpp}
          title={"Din session har gått ut"}
          content={
            <div className="flex flex-col items-center gap-3 px-4 text-center">
              <p>
                Du har varit inaktiv ett tag. Vill du fortsätta vara inloggad?
              </p>
              <MsToMinets ms={minLeft} />
              <div className="flex gap-3">
                <BlueButton
                  buttonText={"Stanna inloggad"}
                  buttonClick={handelLStayLogdIn}
                />
                <BlueButton
                  buttonText={"Logga ut"}
                  buttonClick={handelLogOut}
                />
              </div>
            </div>
          }
        />
      )}
      {children}
    </div>
  );
}

export default InactivityListener;
