import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { LogdInContext } from "../../context/logedInContext";
import { PopUppWindow } from "./popUppWindow";
import { BlueButton } from "./blueButton";

function InactivityListener({ timeoutMs = 900000, children }) {
  const { isLogdIn, logOut } = useContext(LogdInContext);
  const timeoutRef = useRef(null);
  const showingPopUppRef = useRef(false);
  const [showPopUpp, setShowPopUpp] = useState(false);

  useEffect(() => {
    showingPopUppRef.current = showPopUpp;
  }, [showPopUpp]);

  const clearTime = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowPopUpp(false);
  }, []);

  const timeUppdate = useCallback(() => {
    clearTime();

    if (isLogdIn) {
      timeoutRef.current = window.setTimeout(() => {
        setShowPopUpp(true);
      }, timeoutMs);
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
      timeUppdate();
    };

    const event = ["mousedown", "keydown", "mousemove", "scroll"];
    event.forEach((event) => document.addEventListener(event, handleActivity));

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      event.forEach((event) =>
        document.removeEventListener(event, handleActivity),
      );
    };
  }, [isLogdIn, clearTime, timeUppdate]);

  const handelLogOut = () => {
    showingPopUppRef.current = false;
    setShowPopUpp(true);
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
      {" "}
      {showPopUpp && (
        <PopUppWindow
          isOpen={showPopUpp}
          title={"Din session har gått ut"}
          content={
            <div className="flex flex-col items-center gap-3 px-4 text-center">
              <p>
                Du har varit inaktiv ett tag. Vill du fortsätta vara inloggad?
              </p>
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
