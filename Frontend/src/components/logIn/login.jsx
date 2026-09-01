import { useRef, useState } from "react";
import { BlueButton } from "../smalComponents/blueButton";
import { InputField } from "../smalComponents/inputFiled";
import { useLogdIn } from "../../hooks/logInHook";
import { ErrorMessage } from "../smalComponents/errorMessage";
import FetchBackend from "../fetchBackend";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const { logdIn } = useLogdIn();

  const emailInput = useRef(null);
  const passwordIput = useRef(null);

  const handelSubmitt = async (e) => {
    e.preventDefault();

    const email = emailInput.current.value;
    const password = passwordIput.current.value;

    try {
      const responseNode = await FetchBackend({
        url: "/login",
        crud: "POST",
        body: { email, password },
      });

      if (responseNode instanceof Error) {
        setErrorMessage(responseNode.message || "Okänt fel uppstog");
        return;
      }

      logdIn(responseNode.expireCookie);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Något gick fel vid inloggningen.");
      console.error("Något gick fel: " + error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen gap-9 bg-gradient-to-r from-white from-50% to-gray-200 to-50%">
      <div>
        <img
          src="../public/GetAccept.png"
          alt="GetAccept Loga"
          className="h-16"
        />
        <h1 className="flex items-end text-5xl font-bold m-5">Välkommen</h1>
        <h3 className="flex items-center m-5 text-xl justify-center">
          Vänlligen logga in!
        </h3>
      </div>
      <form
        onSubmit={handelSubmitt}
        className="flex flex-col items-end justify-center relative gap-3"
      >
        <InputField
          labelHTML={"email"}
          labelName={"Email:"}
          labelType={"email"}
          name={"email"}
          labelRef={emailInput}
        />
        <InputField
          labelHTML={"password"}
          labelName={"Lösenord"}
          labelType={"password"}
          name={"password"}
          labelRef={passwordIput}
        />
        <BlueButton type="submit" buttonText={"Logga in"} />
        {errorMessage && (
          <ErrorMessage
            error={errorMessage}
            className="absolute left-0 right-0 top-full mt-1 text-center"
          />
        )}
      </form>
    </div>
  );
}

export default Login;
