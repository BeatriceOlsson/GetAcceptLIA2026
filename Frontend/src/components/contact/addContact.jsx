import { useState } from "react";
import { useLogdIn } from "../../hooks/logInHook";
import { BlueButton } from "../smalComponents/blueButton";
import { InputField } from "../smalComponents/inputFiled";
import { ErrorMessage } from "../smalComponents/errorMessage";
import FetchBackend from "../fetchBackend";

function AddContact({ hideContacktPage }) {
  const { isLogdIn } = useLogdIn();
  const [errorMesage, setErrorMasage] = useState("");
  const [fromForm, setFromForm] = useState({
    email: "",
    mobile: "",
    firstName: "",
    lastName: "",
  });

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFromForm((prev) => ({ ...prev, [name]: value }));
  };

  const handelSendingUserData = async (e) => {
    e.preventDefault();

    if (!isLogdIn) {
      setErrorMasage("Behöver vara inlogad för att kunna spara kontakter.");
      return;
    }

    try {
      const responseNode = await FetchBackend({
        url: "/userData",
        crud: "POST",
        body: fromForm,
      });

      if (responseNode instanceof Error) {
        setErrorMasage(responseNode.message || "Okänt fel uppstog");
        return;
      }
      console.log("återställer värderna");
      setErrorMasage("");
      setFromForm({ email: "", mobile: "", firstName: "", lastName: "" });
    } catch (error) {
      console.error("Person kunde inte sparas: " + error);
      setErrorMasage("Person kunde inte sparas.");
    }
  };
  return (
    <div className="border-4 border-blue-900 rounded-sm shadow-lg bg-blue-100">
      <div className="flex items-center justify-center gap-9 m-3 bg-blue-100">
        <form
          className="flex flex-col items-end justify-center relative pb-14 w-100 gap-2"
          onSubmit={handelSendingUserData}
        >
          <InputField
            labelHTML={"email"}
            labelName={"Email"}
            labelType={"email"}
            name={"email"}
            value={fromForm.email}
            onChange={handleInputChange}
          />
          <InputField
            labelHTML={"mobile"}
            labelName={"Mobil"}
            labelType={"tel"}
            name={"mobile"}
            value={fromForm.mobile}
            onChange={handleInputChange}
          />
          <InputField
            labelHTML={"firstName"}
            labelName={"Förnamn"}
            labelType={"text"}
            name={"firstName"}
            value={fromForm.firstName}
            onChange={handleInputChange}
          />
          <InputField
            labelHTML={"lastName"}
            labelName={"Efternamn"}
            labelType={"text"}
            name={"lastName"}
            value={fromForm.lastName}
            onChange={handleInputChange}
          />
          <div className="flex items-center justify-center gap-2">
            <BlueButton type="submit" buttonText={"Läg till kontack"} />
            <BlueButton buttonClick={hideContacktPage} buttonText={"Avbryt"} />
          </div>
          {errorMesage && <ErrorMessage error={errorMesage} />}
        </form>
      </div>
    </div>
  );
}

export default AddContact;
