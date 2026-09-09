import { useContext } from "react";
import { LogdInContext } from "../context/logedInContext";
import { PopUppWindow } from "../components/smalComponents/popUppWindow";
import { BlueButton } from "../components/smalComponents/blueButton";
import { MsToMinets } from "../components/smalComponents/msToMinets";
import useCountdownManagement from "../hooks/useCountdownManagement";
import { useLogdIn } from "../hooks/logInHook";

function InactivityListener({ timeoutMs = 900000, children }) {
  const { isLogdIn, logOut, refrechLogIn, timeLeft } =
    useContext(LogdInContext);
  const { getToken } = useLogdIn();

  const inactivity = useCountdownManagement({ timeoutMs, logdin: isLogdIn });
  const tokenTimeMs = Math.max(0, timeLeft || getToken());

  const token = useCountdownManagement({
    timeoutMs: tokenTimeMs,
    logdin: isLogdIn,
    ignoreActive: true,
  });

  const active = inactivity.showPopUpp ? inactivity : token;

  const handelLogOut = () => {
    inactivity.popUppLogOut();
    token.popUppLogOut();
    logOut();
  };

  const handelLStayLogdIn = () => {
    inactivity.popUppStay();
    token.popUppStay();
    refrechLogIn();
    console.log("Anroop för förnyande av ticken implementering.");
  };

  const shuldPopUppShow = inactivity.showPopUpp || token.showPopUpp;

  return (
    <div>
      {shuldPopUppShow && (
        <PopUppWindow
          isOpen
          title={"Din session har gått ut"}
          content={
            <div className="flex flex-col items-center gap-3 px-4 text-center">
              <p>
                Du har varit inaktiv ett tag. Vill du fortsätta vara inloggad?
              </p>
              <MsToMinets ms={active.minLeft} />
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
