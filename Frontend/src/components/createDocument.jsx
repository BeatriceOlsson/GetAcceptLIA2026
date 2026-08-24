import { useState /*useEffect*/ } from "react";
import { useLogdIn } from "../hooks/logInHook";
import { BlueButton } from "./smalComponents/blueButton";
import { InputField } from "./smalComponents/inputFiled";

function CreateDocument() {
  const { isLogdIn } = useLogdIn();
  const [errorMessage, setErrorMasage] = useState("");
  const [sendData, setSendData] = useState({
    name: "",
    value: "",
  });

  const handelInputDocument = async (e) => {
    const { name, value } = e.target;
    setSendData((prev) => ({ ...prev, [name]: value }));
  };

  const handelSendingDocument = async (e) => {
    e.preventDefault();

    if (!isLogdIn) {
      console.log("Behöver vara inlogad för att kunna spara kontakter.");
      return;
    }
    //Bhåll här ifrån och neråt, skall ändras för att göra anroppet på återanvändbar komponet.
    console.log(sendData);
    try {
      const createDocumentNode = await fetch(
        "http://localhost:3000/createDocument",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sendData),
        },
      );
      const data = await createDocumentNode.json();

      if (!createDocumentNode.ok) {
        setErrorMasage(data.message || "Okänt fel uppstog");
        return;
      }
    } catch (error) {
      console.error("Person kunde inte sparas: " + error);
      setErrorMasage("Person kunde inte sparas.");
    }
  };

  return (
    <div className="w-full max-w-2xl flex flex-row gap-4 m-2">
      <form
        onSubmit={handelSendingDocument}
        className=" flex flex-col relative b-1 w-100 pb-16"
      >
        <InputField
          labelHTML={"name"}
          labelType={"text"}
          labelName={"documentName"}
          value={sendData.name}
          onChange={handelInputDocument}
        />
        <InputField
          labelHTML={"value"}
          labelType={"number"}
          labelName={"value"}
          value={sendData.value}
          onChange={handelInputDocument}
        />
        <BlueButton type={"submit"} buttonText={"Skicka"} />
        {errorMessage && (
          <p className="text-lg text-red-800 font-medium absolute bottom-0 m-auto">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}

export default CreateDocument;
