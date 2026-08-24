import { useState } from "react";
import { useLogdIn } from "../../hooks/logInHook";
import { BlueButton } from "../smalComponents/blueButton";
import { InputField } from "../smalComponents/inputFiled";

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
      const responseNode = await fetch("http://localhost:3000/userData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fromForm),
      });
      const data = await responseNode.json();

      if (!responseNode.ok) {
        setErrorMasage(data.message || "Okänt fel uppstog");
        return;
      }
      console.log("återställer värderna");
      setErrorMasage("");
      setFromForm({ email: "", mobile: "", firstName: "", lastName: "" });
      alert("Person sparadess i db"); //Läg till att man tars till en sida
    } catch (error) {
      console.error("Person kunde inte sparas: " + error);
      setErrorMasage("Person kunde inte sparas.");
    }
  };
  return (
    <div className="border-4 border-blue-900 rounded-sm shadow-lg">
      <div className="flex items-center justify-center gap-9 ml-3 mr-5">
        <form
          className=" flex flex-col relative pb-14 w-100"
          onSubmit={handelSendingUserData}
        >
          <InputField
            labelHTML={"email"}
            labelName={"Email"}
            labelType={"email"}
            value={fromForm.email}
            onChange={handleInputChange}
          />
          <InputField
            labelHTML={"firstName"}
            labelName={"Förnamn"}
            labelType={"text"}
            Value={fromForm.firstName}
            onChange={handleInputChange}
          />
          <InputField
            labelHTML={"lastName"}
            labelName={"Efternamn"}
            labelType={"text"}
            value={fromForm.lastName}
            onChange={handleInputChange}
          />
          <div className="flex gap-2">
            <BlueButton buttonText={"Läg till kontack"} />
            <BlueButton buttonClick={hideContacktPage} buttonText={"Avbryt"} />
          </div>
          {
            /*Skappa som en separat component som man hämtar om error visas?*/ errorMesage && (
              <p className="text-lg text-red-800 font-medium absolute bottom-0 m-auto">
                {errorMesage}
              </p>
            )
          }
        </form>
      </div>
    </div>
  );
}

export default AddContact;
