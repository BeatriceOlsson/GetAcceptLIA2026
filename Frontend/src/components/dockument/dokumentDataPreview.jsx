import { useState } from "react";
import GetContact from "../contact/getContact";
import { DokumentPreview } from "./dokumentPreview";

export function DokumentDataPreview() {
  const [userEmail, setUserEmail] = useState();

  const sendUserEmail = async (user) => {
    if (!user || !user.userEmail) return;

    const email = user.userEmail;
    setUserEmail(email);

    console.log("Datan som blir kvar: ", email);
  };
  return (
    <div className="pt-15">
      <div className="fixed top-7 left-20 z-50 ">
        <GetContact userData={sendUserEmail} returnToParent={true} />
      </div>
      <DokumentPreview email={userEmail} />
    </div>
  );
}
