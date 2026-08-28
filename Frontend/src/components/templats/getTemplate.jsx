import { useEffect, useState } from "react";
import { TemplateBox } from "./template";
import { useDockument } from "../../hooks/saveDataHook";
import { LoadingHandling } from "../smalComponents/loadingHandling";
import { ErrorMessage } from "../smalComponents/errorMessage";
import FetchBackend from "../fetchBackend";

function GetTemplate() {
  const { dockumentData, saveTemplate } = useDockument();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getTemplates = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await FetchBackend({
          url: "/template",
          crud: "GET",
        });

        if (response instanceof Error) {
          setErrorMessage(response.message);
        } else {
          setTemplates(response.templates || []);
        }
      } catch (error) {
        errorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    getTemplates();
  }, [errorMessage]);

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
