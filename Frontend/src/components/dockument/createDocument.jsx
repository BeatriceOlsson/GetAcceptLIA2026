import { useState /*useEffect*/ } from "react";
import { useLogdIn } from "../../hooks/logInHook";
import { BlueButton } from "../smalComponents/blueButton";
import { useDockument } from "../../hooks/saveDataHook";
import { ErrorMessage } from "../smalComponents/errorMessage";
import FetchBackend from "../fetchBackend";

function CreateDocument() {
  const { isLogdIn } = useLogdIn();
  const { sendDockument } = useDockument();
  const [errorMessage, setErrorMasage] = useState("");

  const handelSendingDocument = async (e) => {
    e.preventDefault();

    if (!isLogdIn) {
      console.log("Behöver vara inlogad för att kunna spara kontakter.");
      return;
    }

    try {
      const createDocumentNode = await FetchBackend({
        url: "/createDocument",
        crud: "POST",
        body: sendDockument(),
      });

      if (createDocumentNode instanceof Error) {
        setErrorMasage(createDocumentNode.message || "Okänt fel uppstog");
        return;
      }
    } catch (error) {
      console.error("Person kunde inte sparas: " + error);
      setErrorMasage("Person kunde inte sparas.");
    }
  };

  return (
    <div className=" flex flex-row gap-4 m-2">
      <form
        onSubmit={handelSendingDocument}
        className=" flex flex-col items-end justify-center relative b-1 w-100 gap-3"
      >
        <BlueButton type={"submit"} buttonText={"Skicka"} />
        {errorMessage && <ErrorMessage error={errorMessage} />}
      </form>
    </div>
  );
}

export default CreateDocument;
