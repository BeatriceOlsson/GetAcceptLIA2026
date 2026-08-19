import { useEffect, useState } from "react";
import { useLogdIn } from "../context/logdInContext";
//import { useNavigate } from "react-router-dom";

function GetTemplate({ sendTemplate, selectedT }) {
  const { getToken } = useLogdIn();
  //const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = getToken();

    if (!token) {
      // No token -> redirect to login
      //navigate("/login");
      return;
    }

    const getTemplates = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await fetch("http://localhost:3000/template", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Templats kunde inte hämtas.");
        }

        const data = await response.json();
        setTemplates(data.templates || []);
        console.log(data.templates);
      } catch (err) {
        console.error("Fel uppstod: ", err);
        setErrorMessage(err.message || "Templats kunde inte hämtas.");
      } finally {
        setLoading(false);
      }
    };

    getTemplates();
  }, [getToken /*navigate*/]);

  return (
    <div className="">
      <h2 className="flex items-center justify-center text-3xl font-bold">
        Template
      </h2>
      <ul className="flex items-center justify-center flex-row flex-wrap gap-5 m-4 cursor-pointer">
        {Array.isArray(templates) && templates.length > 0 ? (
          templates.map((template, idx) => {
            const shownTemplate = template.id ?? idx;
            const selected = selectedT === shownTemplate;
            return (
              <li
                key={shownTemplate}
                className={`border-4 border-blue-900 w-60 h-96 flex flex-col justify-between overflow-hidden shadow-lg ${
                  selected
                    ? "border-4 border-green-500 bg-green-50/30 shadow-lg scale-102"
                    : ""
                }`}
                onClick={() => sendTemplate(shownTemplate)}
              >
                <div className="flex-1 min-h-0 w-full flex items-center justify-center">
                  <img
                    src={template.thumb_url}
                    alt=""
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="p-2 flex flex-col gap-0.5">
                  <h2 className="">{template.name}</h2>
                  <p className="text-sm">{template.sender_name}</p>
                  <p className="text-sm">
                    {template.created_at
                      ? new Date(template.created_at).toLocaleDateString(
                          "sv-SE",
                        )
                      : "Datum saknas"}
                  </p>
                </div>
              </li>
            );
          })
        ) : (
          <li>Inga templates hittades.</li>
        )}
      </ul>
      {errorMessage && <p>{errorMessage}</p>}
      {loading && <p>...Loading</p>}
    </div>
  );
}

export default GetTemplate;
