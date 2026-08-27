import { useState /*useEffect*/ } from "react";
import { useLogdIn } from "../hooks/logInHook";
import { BlueButton } from "./smalComponents/blueButton";
import { InputField } from "./smalComponents/inputFiled";
import { useDockument } from "../hooks/saveDataHook";
import { ErrorMessage } from "./smalComponents/errorMessage";
import FetchBackend from "./fetchBackend";

function CreateDocument() {
  const { isLogdIn } = useLogdIn();
  const { saveNameValue } = useDockument();
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
    saveNameValue(sendData);

    console.log(sendData);
    try {
      const createDocumentNode = await FetchBackend(
        {
          url: "/createDocument",
          crud: "POST",
          body: sendData,
        } /*
        "http://localhost:3000/createDocument",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sendData),
        },*/,
      );

      if (!createDocumentNode.ok) {
        setErrorMasage(createDocumentNode.message || "Okänt fel uppstog");
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
        className=" flex flex-col items-end justify-center relative b-1 w-100 pb-16 gap-3"
      >
        <InputField
          labelHTML={"name"}
          labelType={"text"}
          labelName={"Dokument namn"}
          name={"name"}
          value={sendData.name}
          onChange={handelInputDocument}
        />
        <InputField
          labelHTML={"value"}
          labelType={"number"}
          labelName={"value"}
          name={"value"}
          value={sendData.value}
          onChange={handelInputDocument}
        />
        <BlueButton type={"submit"} buttonText={"Skicka"} />
        {errorMessage && <ErrorMessage error={errorMessage} />}
      </form>
    </div>
  );
}

export default CreateDocument;
