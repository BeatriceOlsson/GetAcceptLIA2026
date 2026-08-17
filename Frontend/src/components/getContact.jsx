import { useEffect, useState } from "react";

function GetContact() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

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

  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-blue-100 gap-9 border-4">
      <form className=" flex flex-col relative pb-14 w-100 pr-36">
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
          <button
            className="border-4 border-blue-900 rounded-sm w-32 h-10 mt-4 m-auto"
            /*onClick={Skappa  context som har kolla pådetta och kan skicka info mellan components}*/
          >
            Läg till kontackt
          </button>
        </div>
        {results.length > 0 ? (
          <ul className="absolute top-20 left-1 bg-blue-100">
            {results.map((person, index) => (
              <li
                key={`${person.userEmail || "contact"}-${index}`}
                className="flex flex-row justify-between w-80 p-1 cursor-pointer"
                onClick={() => setSearch(person.userEmail)}
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
