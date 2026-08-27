import { useEffect, useState } from "react";
import { TemplateBox } from "./template";
import { useLogdIn } from "../../hooks/logInHook";
import { useDockument } from "../../hooks/saveDataHook";
import { LoadingHandling } from "../smalComponents/loadingHandling";
import { ErrorMessage } from "../smalComponents/errorMessage";

function GetTemplate() {
  const { getToken } = useLogdIn();
  const { dockumentData, saveTemplate } = useDockument();
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
        {Array.isArray(templates) &&
          templates.length > 0 &&
          templates.map((template) => {
            const templateId = template.id ?? template._id;
            const isSelected = dockumentData?.template === templateId;

            return (
              <TemplateBox
                key={templateId ?? template.name}
                template={template}
                selected={isSelected}
                onSelected={() => {
                  const status = saveTemplate?.(templateId);
                  console.log("Template status:", status);
                }}
              />
            );
          })}
      </ul>
      {errorMessage && <ErrorMessage error={errorMessage} />}
      {loading && <LoadingHandling />}
    </div>
  );
}

export default GetTemplate;
