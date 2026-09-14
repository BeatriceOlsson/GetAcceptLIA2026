import { useEffect, useState } from "react";
import { useDockument } from "../../hooks/saveDataHook";
import { InputField } from "../smalComponents/inputFiled";
import { ErrorMessage } from "../smalComponents/errorMessage";
import { BlueButton } from "../smalComponents/blueButton";
import { useContactHandeler } from "../../hooks/useContactHandlerHook";

function GetContact({
  userData = () => {},
  returnToParent = false,
  onOpenContacts,
}) {
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [onFokusDropDown, setOnFokusDropDown] = useState(false);
  const { saveRecipient } = useDockument();
  const { seartchUserLoop, respons, uppdateUserList } = useContactHandeler();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  useEffect(() => {
    seartchUserLoop(search);
  }, [search]);

  useEffect(() => {
    if (respons.length === 0) {
      uppdateUserList();
    }
  }, []);

  const sendContackt = async (e, person) => {
    e.preventDefault();

    if (!person) {
      setErrorMessage("Data saknas.");
      return;
    }

    const contact = { ...person };

    if (returnToParent) {
      userData(contact);
    } else {
      saveRecipient(contact);
    }
    setSearch("");
    setOnFokusDropDown(false);
  };

  const hasTyped = search.trim().length > 0;

  return (
    <div className=" flex flex-row gap-4 m-2">
      <form onSubmit={sendContackt} className="flex flex-row">
        <div className=" flex flex-col relative pb-14 max-w-[500px] mr-2">
          <InputField
            labelHTML={"email"}
            labelName={"Sök kontakt:"}
            labelType={"text"}
            value={search}
            onChange={handleSearchChange}
            onFocus={() => setOnFokusDropDown(true)}
            onBlur={() => setOnFokusDropDown(false)}
          />
        </div>
        {hasTyped && respons.length > 0 && onFokusDropDown ? (
          <ul className="absolute mt-16 bg-white rounded-lg ease-in-out z-50">
            {respons.map((person, index) => (
              <li
                key={`${person.userEmail || "contact"}-${index}`}
                className="flex flex-row justify-between w-80 p-1 cursor-pointer"
                onMouseDown={(e) => {
                  sendContackt(e, person);
                }}
              >
                <p className="text-l m-1">{person.userEmail}</p>
                <p className="text-l m-1">
                  {person.firstName || ""} {person.lastName || ""}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <ErrorMessage error={errorMessage} />
        )}
        {!hasTyped && !returnToParent && onFokusDropDown && (
          <ul className="absolute mt-16 bg-white rounded-lg ease-in-out z-50 h-2 w-80">
            <li>
              <BlueButton
                className="m-1"
                buttonText={"Se kontackter"}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onOpenContacts?.();
                  setOnFokusDropDown(false);
                }}
              />
            </li>
          </ul>
        )}
      </form>
    </div>
  );
}

export default GetContact;
