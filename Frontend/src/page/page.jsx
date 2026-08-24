import { useState } from "react";
import GetContact from "../components/contact/getContact";
import CreateDocument from "../components/createDocument";
import GetTemplate from "../components/templats/getTemplate";
import AddContact from "../components/contact/addContact";
import UploadFile from "../components/upploadingOfDokument/uploadFile";
import { useLogdIn } from "../hooks/logInHook";
import { BlueButton } from "../components/smalComponents/blueButton";

function Page() {
  const [addContactState, setAddContactState] = useState(false);
  const [imageLink, setImageLink] = useState(false);
  const { logOut } = useLogdIn();

  /* const handelRecipients = (newInList) => {
    setRecipientsList((prev) => {
      const nextList = [...prev, newInList];
      return nextList;
    });
  };

  const removeContact = (contactToRemove) => {
    setRecipientsList((prev) =>
      prev.filter((person) => person.userEmail !== contactToRemove),
    );
  };*/

  const showAddContact = () => {
    return setAddContactState(!addContactState);
  };

  const showAlternativToTemplate = () => {
    return setImageLink(!imageLink);
  };

  /* const sendUploadedFile = async (uploadedData) => {
    const fileId = uploadedData?.url || uploadedData || null;
    return setUploadedFile(fileId);
  };*/

  return (
    <div className="bg-blue-100 p-4">
      <BlueButton buttonClick={logOut} buttonText={"Logga ut"} />
      <div className="flex justify-evenly">
        <GetContact
          className="w-80 relative"
          addContacktPage={showAddContact}
        />
        <div
          className={`absolute transition-all duration-300 ease-in-out top-40 left-5 ${
            addContactState
              ? "opacity-100 translate-x-0 pointer-events-auto bg-blue-100"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <AddContact hideContacktPage={showAddContact} />
        </div>
        <CreateDocument />
      </div>
      <div className="ml-11">
        <BlueButton
          buttonClick={showAlternativToTemplate}
          buttonText={"Bild eller Länk"}
        />
        <div
          className={`transition-all duration-300 ease-in-out ${
            imageLink
              ? "max-h-[500px] opacity-100 translate-x-0 pointer-events-auto bg-blue-100"
              : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <UploadFile />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <GetTemplate />
      </div>
    </div>
  );
}

export default Page;
