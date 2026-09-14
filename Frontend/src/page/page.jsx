import { useRef, useState } from "react";
import GetContact from "../components/contact/getContact";
import CreateDocument from "../components/dockument/createDocument";
import GetTemplate from "../components/templats/getTemplate";
import AddContact from "../components/contact/addContact";
import UploadFile from "../components/upploadingOfDokument/uploadFile";
import { useLogdIn } from "../hooks/logInHook";
import { BlueButton } from "../components/smalComponents/blueButton";
import NameAndValue from "../components/dockument/nameAndValue";
import InactivityListener from "../timeManagement/inactivityListernner";
import { SelectedContact } from "../components/contact/selectedContacts";
import ShowDockumentData from "../components/dockument/showDockumentData";
import { useDockument } from "../hooks/saveDataHook";
import ScrollIntoView from "../components/smalComponents/scrollIntoView";
import { BigPopUppWindow } from "../components/smalComponents/biggPopUppWindow";
import { DokumentDataPreview } from "../components/dockument/dokumentDataPreview";
import { ShowAllContacts } from "../components/contact/showAllContacts";

function Page() {
  const [addContactState, setAddContactState] = useState(false);
  const [imageLink, setImageLink] = useState(false);
  const [dockumentSent, setDokumentSent] = useState(false);
  const [showDocPreview, setShowDocPreview] = useState(false);
  const [showAllConatcts, setShowAllContackts] = useState(false);
  const [clearDockumentPreview, setClearDockumentPreview] = useState(0);
  const scrollToTopRef = useRef(null);
  const { resetDockument } = useDockument();
  const { logOut } = useLogdIn();

  const showAddContact = () => {
    return setAddContactState(!addContactState);
  };

  const showAlternativToTemplate = () => {
    return setImageLink(!imageLink);
  };

  const dockumentSentOk = () => {
    return setDokumentSent(!dockumentSent);
  };

  const clowsPopUppAndRemoveData = () => {
    resetDockument();
    setDokumentSent(false);
  };

  const showDockumentPreview = () => {
    setShowDocPreview(!showDocPreview);
    setClearDockumentPreview((prev) => prev + 1);
  };

  const showingAllContacts = () => {
    setShowAllContackts((prev) => !prev);
  };

  return (
    <InactivityListener timeoutMs={90000000}>
      <div className="grid md:grid-cols-[0.5fr_4fr_1fr] bg-white p-4">
        <BigPopUppWindow
          isOpen={dockumentSent}
          title={"Följande  dockument har skickats:"}
          content={
            <div className="flex flex-col justify-center items-center w-full max-w-[80vw]">
              <ShowDockumentData
                className="flex items-start"
                dockumentSent={true}
              />
              <div className="flex justify-center">
                <h3 className="text-2xl m-2">Mottagare</h3>
              </div>
              <div className="flex flex-row flex-wrap items-center justify-start gap-4 w-full">
                <SelectedContact
                  dockumentSent={true}
                  className="inline-flex flex-col"
                />
              </div>
              <div className="flex justify-center mt-4">
                <BlueButton
                  buttonText="Stäng"
                  buttonClick={clowsPopUppAndRemoveData}
                />
              </div>
            </div>
          }
        />
        <BigPopUppWindow
          isOpen={showDocPreview}
          content={
            <div>
              <DokumentDataPreview key={clearDockumentPreview} />
              <BlueButton
                className="fixed bottom-14 left-[45%] xl:bottom-24"
                buttonText="Stäng"
                buttonClick={showDockumentPreview}
              />
            </div>
          }
        />
        <div>
          <ShowAllContacts
            showPopUpp={showAllConatcts}
            onClose={showingAllContacts}
          />
        </div>
        <div
          ref={scrollToTopRef}
          className="col-start-2 grid  grid-cols-[0.5fr_3fr] gap-3"
        >
          <div className="flex flex-row justify-start items-center w-36">
            <BlueButton
              buttonClick={logOut}
              buttonText={"Logga ut"}
              onMouseDown={resetDockument}
              className="m-3"
            />
          </div>
          <div className="col-start-2">
            <div className="flex justify-start items-center h-full">
              <img
                src="/GetAccept.png"
                alt="GetAccept loga"
                className="h-7 w-auto "
              />
            </div>
          </div>
        </div>

        <div className="col-start-2 grid md:grid-cols-[2fr_2fr_1fr] ">
          <div>
            <NameAndValue />
          </div>
          <div>
            <GetContact
              onOpenContacts={showingAllContacts}
              onClose={showAllConatcts}
            />
          </div>
          <div className="relative">
            <BlueButton
              type="button"
              buttonClick={showAddContact}
              buttonText={"Läg till kontakt"}
              className="m-2 mt-10"
            />
            <BlueButton
              type="button"
              buttonText={"Sök Dokument"}
              className="m-2 mt-7"
              buttonClick={showDockumentPreview}
            />
            <div
              className={`absolute transition-all duration-300 ease-in-out top-20 right-8 z-50 ${
                addContactState
                  ? "opacity-100 translate-x-0 pointer-events-auto bg-white"
                  : "opacity-0 -translate-y-4 pointer-events-none"
              }`}
            >
              <AddContact hideContacktPage={showAddContact} />
            </div>
          </div>
        </div>

        <div className="col-start-2">
          <div className="m-1">
            <BlueButton
              buttonClick={showAlternativToTemplate}
              buttonText={"Bild eller Länk"}
              className="m-1.5"
            />
            <div className="sticky top-40 m-2 h-0">
              <div className="absolute top-[calc(100vh-220px)]">
                <ScrollIntoView targetRef={scrollToTopRef} text="Till toppen" />
              </div>
            </div>
            <div
              className={`transition-all duration-300 ease-in-out ${
                imageLink
                  ? "max-h-[500px] opacity-100 translate-x-0 pointer-events-auto bg-white"
                  : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
              }`}
            >
              <UploadFile />
            </div>
            <div className="flex items-center justify-center">
              <GetTemplate />
            </div>
          </div>
        </div>

        <div className="grid row-span-4">
          <div className="fixed top-0 right-0 bottom-0 w-56 border-2 border-gray-700 rounded-lg mt-3.5 mb-3.5 ">
            <div className="flex flex-col justify-center items-center gap-2 mt-3">
              <CreateDocument dockumentSent={dockumentSentOk} />
              <ShowDockumentData />
              <h3 className="text-2xl">Mottagare</h3>
              <div className="overflow-y-auto pb-2 max-h-[calc(75vh_-_220px)] flex flex-col items-center gap-1">
                <SelectedContact />
              </div>
            </div>
          </div>
        </div>
      </div>
    </InactivityListener>
  );
}

export default Page;
