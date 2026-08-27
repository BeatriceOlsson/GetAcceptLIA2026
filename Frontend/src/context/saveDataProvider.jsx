import { useCallback, useEffect, useState } from "react";
import { SaveDataContext } from "./savedDataContext";

export function SaveDataProvider({ children }) {
  const [dockumentData, setDokumentData] = useState({
    name: "",
    value: "",
    recipients: [],
    template: null,
    file: null,
  });

  const getRecipientEmail = useCallback((person) => {
    if (!person) {
      return "";
    }

    if (typeof person === "string") {
      return person.trim().toLowerCase();
    }

    return (person.userEmail ?? person.email ?? "").trim().toLowerCase();
  }, []);

  const saveNameValue = useCallback((name, value) => {
    if (typeof name === "object" && name !== null) {
      setDokumentData((prev) => ({ ...prev, ...name }));
      return;
    }

    setDokumentData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const saveRecipient = useCallback((newRecipien) => {
    const email = newRecipien?.userEmail ?? newRecipien?.email ?? "";

    setDokumentData((prev) => ({
      ...prev,
      recipients: [
        ...prev.recipients,
        { ...newRecipien, userEmail: email, email, role: "Signer" },
      ],
    }));
  }, []);

  const removeRecipient = useCallback(
    (recipienToRemove) => {
      const emailToRemove = getRecipientEmail(recipienToRemove);

      setDokumentData((prev) => ({
        ...prev,
        recipients: prev.recipients.filter(
          (person) => getRecipientEmail(person) !== emailToRemove,
        ),
      }));
    },
    [getRecipientEmail],
  );

  const uppdateRecipientRole = useCallback(
    (user, role) => {
      const emailToUpdate = getRecipientEmail(user);

      setDokumentData((prev) => ({
        ...prev,
        recipients: prev.recipients.map((person) => {
          if (getRecipientEmail(person) !== emailToUpdate) {
            return person;
          }

          return {
            ...person,
            role,
            userEmail: person.userEmail ?? person.email ?? "",
            email: person.email ?? person.userEmail ?? "",
          };
        }),
      }));
    },
    [getRecipientEmail],
  );

  const saveTemplate = useCallback((newTemplate) => {
    setDokumentData((prev) => ({
      ...prev,
      template: prev.template === newTemplate ? null : newTemplate,
    }));
  }, []);

  const upploudedFile = useCallback((newFile) => {
    setDokumentData((prev) => ({
      ...prev,
      file: newFile ?? "",
    }));
  }, []);

  const sendRecipient = useCallback(() => {
    return {
      recipients: dockumentData.recipients.map((person) => ({
        ...person,
        email: person.userEmail ?? person.email ?? "",
        role: person.role ?? "Signer",
      })),
    };
  }, [dockumentData]);

  const sendDockument = useCallback(() => {
    return {
      name: dockumentData.name,
      value: dockumentData.value,
      recipients: dockumentData.recipients.map((person) => ({
        email: person.userEmail ?? person.email ?? "",
        mobile: person.mobile,
        firstName: person.firstName,
        lastName: person.lastName,
        role: person.role ?? "Signer",
      })),
      template_id: dockumentData.template,
      file_id: dockumentData.file?.file_id ?? "",
    };
  }, [dockumentData]);

  const resetDockument = useCallback(() => {
    setDokumentData({
      name: "",
      value: "",
      recipients: [],
      template: null,
      file: null,
    });
  }, []);

  const data = {
    dockumentData,
    saveNameValue,
    saveRecipient,
    removeRecipient,
    uppdateRecipientRole,
    saveTemplate,
    upploudedFile,
    sendRecipient,
    sendDockument,
    resetDockument,
  };

  useEffect(() => {
    console.log(dockumentData);
  }, [dockumentData]);

  return (
    <SaveDataContext.Provider value={data}>{children}</SaveDataContext.Provider>
  );
}
