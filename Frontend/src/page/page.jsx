import { useState } from "react";
import GetContact from "../components/contact/getContact";
import CreateDocument from "../components/dockument/createDocument";
import GetTemplate from "../components/templats/getTemplate";
import AddContact from "../components/contact/addContact";
import UploadFile from "../components/upploadingOfDokument/uploadFile";
import { useLogdIn } from "../hooks/logInHook";
import { BlueButton } from "../components/smalComponents/blueButton";
import NameAndValue from "../components/dockument/nameAndValue";
import InactivityListener from "../components/smalComponents/inactivityListernner";
import { SelectedContact } from "../components/contact/selectedContacts";
import ShowDockumentData from "../components/dockument/showDockumentData";

function Page() {
  const [addContactState, setAddContactState] = useState(false);
  const [imageLink, setImageLink] = useState(false);
  const { logOut } = useLogdIn();

  const showAddContact = () => {
    return setAddContactState(!addContactState);
  };

  const showAlternativToTemplate = () => {
    return setImageLink(!imageLink);
  };

  return (
    <InactivityListener timeoutMs={900000}>
      <div className="bg-white p-4 mr-60">
        <div className="flex flex-row justify-start items-center gap-2 w-80">
          <BlueButton buttonClick={logOut} buttonText={"Logga ut"} />
          <img
            src="../public/GetAccept.png"
            alt="GetAccept loga"
            className="h-7 w-auto"
          />
        </div>
        <div className="flex flex-row justify-center items-start">
          <NameAndValue />
          <div className="w-80 relative">
            <GetContact addContacktPage={showAddContact} />
            <div
              className={`absolute transition-all duration-300 ease-in-out top-40 left-40 z-50 ${
                addContactState
                  ? "opacity-100 translate-x-0 pointer-events-auto bg-white"
                  : "opacity-0 -translate-y-4 pointer-events-none"
              }`}
            >
              <AddContact hideContacktPage={showAddContact} />
            </div>
          </div>
        </div>
        <div className="ml-11">
          <BlueButton
            buttonClick={showAlternativToTemplate}
            buttonText={"Bild eller Länk"}
          />
          <div
            className={`transition-all duration-300 ease-in-out ${
              imageLink
                ? "max-h-[500px] opacity-100 translate-x-0 pointer-events-auto bg-white"
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
      <div className="fixed top-0 right-0 bottom-0 w-60 border-2 border-gray-700 rounded-lg mt-3 mb-3">
        <div className="flex flex-col justify-center items-center gap-2 mt-3">
          <CreateDocument />
          <ShowDockumentData />
          <SelectedContact />
        </div>
      </div>
      {/* 
        <div className="flex flex-row justify-evenly">
          <div className="w-80 relative">
            <GetContact addContacktPage={showAddContact} />
          </div>
          <div
            className={`absolute transition-all duration-300 ease-in-out top-40 left-40 z-50 ${
              addContactState
                ? "opacity-100 translate-x-0 pointer-events-auto bg-white"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <AddContact hideContacktPage={showAddContact} />
          </div>
          <div className="flex flex-col">
            <NameAndValue />
            <CreateDocument />
          </div>
          <SelectedContact />
        </div>
        <div className="ml-11">
          <BlueButton
            buttonClick={showAlternativToTemplate}
            buttonText={"Bild eller Länk"}
          />
          <div
            className={`transition-all duration-300 ease-in-out ${
              imageLink
                ? "max-h-[500px] opacity-100 translate-x-0 pointer-events-auto bg-white"
                : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <UploadFile />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <GetTemplate />*/}
    </InactivityListener>
  );
}

export default Page;
