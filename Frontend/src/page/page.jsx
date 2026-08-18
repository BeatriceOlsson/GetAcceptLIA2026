import { useState } from "react";
import GetContact from "../components/getContact";
import CreateDocument from "../components/createDocument";

function Page() {
  const [recipientsList, setRecipientsList] = useState([]);

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

  return (
    <div className="bg-blue-100 flex flex-row gap-2 m-2">
      <GetContact contactToRecipients={handelRecipients} />
      <CreateDocument
        recipients={recipientsList}
        removeContact={removeContact}
      />
    </div>
  );
}

export default Page;
