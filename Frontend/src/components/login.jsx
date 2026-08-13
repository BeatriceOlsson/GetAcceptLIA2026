import { useRef, useState } from "react";

function Login() {
  const [errorMessage, setErrorMessage] = useState();

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

      localStorage.setItem("getaccept_token", data.token);
      setErrorMessage(null);

      alert("Du logades in!"); //Laga till att man kommer vidare till skappa sidan
    } catch (error) {
      console.log("Något gick fel: " + error);
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
      <form
        onSubmit={handelSubmitt}
        className=" flex flex-col relative pb-14 w-100"
      >
        <label htmlFor="email" className="text-xl m-1">
          Email:
        </label>
        <input
          type="text"
          ref={emailInput}
          className="rounded-sm w-80 h-9 p-2"
        />
        <label htmlFor="password" className="text-xl m-1">
          Lösenord
        </label>
        <input
          type="password"
          ref={passwordIput}
          className="rounded-sm w-80 h-9 gap-2 p-2"
        />
        <button
          type="submit"
          className="border-4 border-blue-900 rounded-sm w-40 h-10 mt-4 m-auto "
        >
          Logga in
        </button>
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
