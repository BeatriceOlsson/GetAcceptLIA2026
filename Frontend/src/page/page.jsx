import { useState } from "react";
import GetContact from "../components/getContact";
import CreateDocument from "../components/createDocument";
import GetTemplate from "../components/getTemplate";

function Page() {
  const [recipientsList, setRecipientsList] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handelRecipients = (newInList) => {
    setRecipientsList((prev) => {
      const nextList = [...prev, newInList];
      return nextList;
    });
  };

  const removeContact = (contactToRemove) => {
    setRecipientsList((prev) =>
      prev.filter((person) => person.userEmail !== contactToRemove),
    );
  };

  const sendTemplate = async (id) => {
    if (selectedTemplate === id) {
      setSelectedTemplate(null);
    } else {
      setSelectedTemplate(id);
    }
    return setSelectedTemplate;
  };

  return (
    <div className="bg-blue-100">
      <div className=" flex flex-row gap-2 m-2">
        <GetContact contactToRecipients={handelRecipients} />
        <CreateDocument
          recipients={recipientsList}
          removeContact={removeContact}
        />
      </div>
      <div className="flex items-center justify-center">
        <GetTemplate sendTemplate={sendTemplate} selectedT={selectedTemplate} />
      </div>
    </div>
  );
}

export default Page;
