import { useState } from "react";
import { useLogdIn } from "../context/logdInContext";

function AddContact() {
  const { isLogdIn } = useLogdIn();
  const [errorMesage, setErrorMasage] = useState("");
  const [fromForm, setFromForm] = useState({
    email: "",
    mobile: "",
    firstName: "",
    lastName: "",
  });

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFromForm((prev) => ({ ...prev, [name]: value }));
  };

  const handelSendingUserData = async (e) => {
    e.preventDefault();

    if (!isLogdIn) {
      setErrorMasage("Behöver vara inlogad för att kunna spara kontakter.");
      return;
    }

    try {
      const responseNode = await fetch("http://localhost:3000/userData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fromForm),
      });
      const data = await responseNode.json();

      if (!responseNode.ok) {
        setErrorMasage(data.message || "Okänt fel uppstog");
        return;
      }
      console.log("återställer värderna");
      setErrorMasage("");
      setFromForm({ email: "", mobile: "", firstName: "", lastName: "" });
      alert("Person sparadess i db"); //Läg till att man tars till en sida
    } catch (error) {
      console.error("Person kunde inte sparas: " + error);
      setErrorMasage("Person kunde inte sparas.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 gap-9">
      <form
        onSubmit={handelSendingUserData}
        className=" flex flex-col relative pb-14 w-100"
      >
        <label htmlFor="email" className="text-xl m-1">
          Email
        </label>
        <input
          name="email"
          type="email"
          value={fromForm.email}
          onChange={handleInputChange}
          className="rounded-sm w-80 h-9 p-2"
        />
        <label htmlFor="mobile" className="text-xl m-1">
          Mobiltelefon
        </label>
        <input
          name="mobile"
          type="text"
          value={fromForm.mobile}
          onChange={handleInputChange}
          className="rounded-sm w-80 h-9 p-2"
        />
        <label htmlFor="firstName" className="text-xl m-1">
          Förnamn
        </label>
        <input
          name="firstName"
          type="text"
          value={fromForm.firstName}
          onChange={handleInputChange}
          className="rounded-sm w-80 h-9 p-2"
        />
        <label htmlFor="lastName" className="text-xl m-1">
          Efternamn
        </label>
        <input
          name="lastName"
          type="text"
          value={fromForm.lastName}
          onChange={handleInputChange}
          className="rounded-sm w-80 h-9 p-2"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="border-4 border-blue-900 rounded-sm w-32 h-10 mt-4 m-auto"
          >
            Läg till
          </button>
          <button
            type="reset"
            className="border-4 border-blue-900 rounded-sm w-32 h-10 mt-4 m-auto "
          >
            Avbryt
          </button>
        </div>
        {/*Läg till att man får tillbacka till sidan för forms */}
        {errorMesage && (
          <p className="text-lg text-red-800 font-medium absolute bottom-0 m-auto">
            {errorMesage}
          </p>
        )}
      </form>
    </div>
  );
}

export default AddContact;
