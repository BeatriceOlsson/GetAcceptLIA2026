import { useState } from "react";
import { useLogdIn } from "../context/logdInContext";

function CreateDocument({ recipients, removeContact }) {
  const { isLogdIn } = useLogdIn();
  const [errorMessage, setErrorMasage] = useState("");
  const [sendData, setSendData] = useState({
    name: "",
    file_ur: "",
    file_id: "",
    template_id: "",
    value: "",
    role: "",
    recipients: [recipients],
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
        action="submit"
        onSubmit={handelSendingDocument}
        className=" flex flex-col relative b-1 w-100 pb-16"
      >
        <label htmlFor="name" className="text-xl m-1">
          Dockument namn:
        </label>
        <input
          type="text"
          name="name"
          value={sendData.name}
          onChange={handelInputDocument}
          className="rounded-sm w-80 h-9 p-2 static"
        />
        <label htmlFor="value" className="text-xl m-1">
          Värde
        </label>
        <input
          type="number"
          name="value"
          value={sendData.value}
          onChange={handelInputDocument}
          className="rounded-sm w-80 h-9 p-2 "
        />
        <button
          type="submit"
          className="border-4 border-blue-900 rounded-sm w-32 h-10 mt-4 m-auto"
        >
          Skicka
        </button>
        {errorMessage && (
          <p className="text-lg text-red-800 font-medium absolute bottom-0 m-auto">
            {errorMessage}
          </p>
        )}
      </form>
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl">Mottagare</h3>
        {recipients.map((person, index) => (
          <ul className="border-4 border-blue-900 rounded-sm flex flex-row w-64 h-25 p-1 relative">
            <li key={index}>
              <button
                onClick={() => removeContact(person.userEmail)}
                className="text-1xl right-0 m-1 absolute"
              >
                X
              </button>
              <h3 className="text-l m-0.5">
                {person.firstName} {person.lastName}
              </h3>
              <p className="m-0.5">{person.userEmail}</p>
              <select
                name="role"
                id="role"
                className="border-4 border-blue-900 rounded-sm"
              >
                <option value="Signer">Signerare</option>
                <option value="internalApprover">Intern godkännaer</option>
                <option value="externalApprover">Extern godkännare</option>
                <option value="cc">Läsare</option>
              </select>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default CreateDocument;
