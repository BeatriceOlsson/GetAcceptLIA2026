import { useEffect, useState } from "react";
import { TemplateBox } from "./template";
import { useLogdIn } from "../../hooks/logInHook";

function GetTemplate({ sendTemplate, selectedT }) {
  const { getToken } = useLogdIn();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = getToken();

    if (!token) {
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
      } catch (err) {
        console.error("Fel uppstod: ", err);
        setErrorMessage(err.message || "Templats kunde inte hämtas.");
      } finally {
        setLoading(false);
      }
    };

    getTemplates();
  }, [getToken]);

  return (
    <div className="">
      <h2 className="flex items-center justify-center text-3xl font-bold">
        Template
      </h2>
      <ul className="flex items-center justify-center flex-row flex-wrap gap-5 m-4 cursor-pointer">
        {Array.isArray(templates) && templates.length > 0 ? (
          templates.map((template) => (
            <TemplateBox
              key={template.id ?? template._id ?? template.name}
              template={template}
              selected={selectedT === template.id || selectedT === template._id}
              onSelected={() => sendTemplate?.(template.id ?? template._id)}
            />
          ))
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
