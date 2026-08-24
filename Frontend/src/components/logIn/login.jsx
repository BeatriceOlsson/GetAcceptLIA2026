import { useRef, useState } from "react";
import { useLogdIn } from "../../hooks/logInHook";
import { BlueButton } from "../smalComponents/blueButton";
import { InputField } from "../smalComponents/inputFiled";

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
      const responseNode = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await responseNode.json();

      if (!responseNode.ok) {
        setErrorMessage(data.message || "Okänt fel uppstog");
        return;
      }

      logdIn(data.token);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Något gick fel vid inloggningen.");
      console.error("Något gick fel: " + error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 gap-9">
      <div>
        <h1 className="text-5xl font-bold m-5">Välkommen</h1>
        <h3 className="flex items-center m-5 text-xl justify-center">
          {" "}
          Vänlligen logga in!
        </h3>
      </div>
      <form className=" flex flex-col relative pb-14 w-100">
        <InputField
          labelHTML={"email"}
          labelName={"Email:"}
          labelType={"email"}
          labelRef={emailInput}
        />
        <InputField
          labelHTML={"password"}
          labelName={"Lösenord"}
          labelType={"password"}
          labelRef={passwordIput}
        />
        <BlueButton buttonClick={handelSubmitt} buttonText={"Logga in"} />
        {errorMessage && (
          <p className="text-lg text-red-800 font-medium absolute bottom-0 m-auto">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
