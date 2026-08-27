import { useEffect, useState } from "react";
import { BlueButton } from "../smalComponents/blueButton";
import { useDockument } from "../../hooks/saveDataHook";

function GetContact({ addContacktPage }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedContact, setselectedContact] = useState(null);
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
        const res = await fetch(
          `http://localhost:3000/userData?s=${encodeURIComponent(value)}`,
        );

        if (!res.ok) {
          throw new Error("Kunde inte hämta kontakt");
        }

        const data = await res.json();
        const contacts = Array.isArray(data?.data) ? data.data : [];
        setResults(contacts);
      } catch (error) {
        console.error("Användare kunde inte hittas", error);
        setResults([]);
      }
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const sendContackt = async (e) => {
    e.preventDefault();

    if (!selectedContact) {
      console.log("Data saknas ", selectedContact);
      return;
    }

    const contact = { ...selectedContact };
    console.log(contact);
    saveRecipient(contact);
    setResults([]);
    setSearch("");
    setselectedContact(null);
  };

  return (
    <div className="w-full max-w-s flex flex-col gap-4 m-2">
      <form
        onSubmit={sendContackt}
        className=" flex flex-col relative pb-14 max-w-[500px] "
      >
        <label htmlFor="contact-search" className="text-xl m-1">
          Sök kontakt:
        </label>
        <input
          id="contact-search"
          type="text"
          value={search}
          onChange={handleSearchChange}
          className="rounded-sm w-80 h-9 p-2 static"
        />
        <div className="absolute top-5 right-0">
          <div className="flex flex-col">
            <BlueButton type="submit" buttonText={"Läg till"} />
            <BlueButton
              type="button"
              buttonClick={addContacktPage}
              buttonText={"Läg till kontakt"}
            />
          </div>
        </div>
        {results.length > 0 ? (
          <ul className="absolute top-20 left-1 bg-blue-100 ease-in-out z-50">
            {results.map((person, index) => (
              <li
                key={`${person.userEmail || "contact"}-${index}`}
                className="flex flex-row justify-between w-80 p-1 cursor-pointer"
                onClick={() => {
                  setSearch(person.userEmail);
                  setselectedContact(person);
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
          <p></p>
        )}
      </form>
    </div>
  );
}

export default GetContact;
