import { useEffect, useState } from "react";
import { useDockument } from "../../hooks/saveDataHook";
import FetchBackend from "../fetchBackend";
import { InputField } from "../smalComponents/inputFiled";
import { ErrorMessage } from "../smalComponents/errorMessage";

function GetContact({ userData = () => {}, returnToParent = false }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const { saveRecipient } = useDockument();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim() || value.trim().length < 2) {
      setResults([]);
    }
  };

  useEffect(() => {
    const value = search.trim();

    if (!value || value.length < 2) {
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const res = await FetchBackend({
          url: `/userData?s=${encodeURIComponent(value)}`,
        });

        if (res instanceof Error) {
          throw new Error("Kunde inte hämta kontakt");
        }

        const contacts = Array.isArray(res?.data) ? res.data : [];
        setResults(contacts);
      } catch (error) {
        console.error("Användare kunde inte hittas", error);
        setResults([]);
      }
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [search]);

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
    setResults([]);
    setSearch("");
  };

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
          />
        </div>
        {results.length > 0 ? (
          <ul className="absolute mt-16 bg-white rounded-lg ease-in-out z-50">
            {results.map((person, index) => (
              <li
                key={`${person.userEmail || "contact"}-${index}`}
                className="flex flex-row justify-between w-80 p-1 cursor-pointer"
                onClick={(e) => {
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
      </form>
    </div>
  );
}

export default GetContact;
