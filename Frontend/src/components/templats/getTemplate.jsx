import { useEffect, useState } from "react";
import { TemplateBox } from "./template";
import { useDockument } from "../../hooks/saveDataHook";
import { LoadingHandling } from "../smalComponents/loadingHandling";
import { ErrorMessage } from "../smalComponents/errorMessage";
import FetchBackend from "../fetchBackend";
import SeartchFunction from "../smalComponents/seartchFunction";

function GetTemplate() {
  const { dockumentData, saveTemplate } = useDockument();
  const [templates, setTemplates] = useState([]);
  const [filterdTemplate, setFilterdTemplate] = useState([]);
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
          setFilterdTemplate(response.template || []);
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
    <div className="flex flex-row items-center w-full">
      <div className="grid grid-cols-3 items-center w-full">
        <div className="col-start-2">
          <h2 className="flex-1 text-center text-3xl font-bold">Template</h2>
        </div>
        <div className="col-start-3">
          <div className="flex items-center justify-center">
            <SeartchFunction
              className="w-40 flex justify-end"
              data={templates}
              seartchKey={["name", "sender_name"]}
              filteredData={setFilterdTemplate}
            />
          </div>
        </div>
        <ul className="col-start-1 col-span-3 flex items-center justify-center flex-row flex-wrap gap-5 m-4 cursor-pointer">
          {Array.isArray(filterdTemplate) &&
            filterdTemplate.length > 0 &&
            filterdTemplate.map((template) => {
              const templateId = template.id ?? template._id;
              const isSelected = dockumentData?.template === templateId;

              return (
                <TemplateBox
                  key={templateId ?? template.name}
                  template={template}
                  selected={isSelected}
                  onSelected={() => {
                    saveTemplate?.(templateId);
                  }}
                />
              );
            })}
        </ul>
        <div className="col-start-2">
          {errorMessage && <ErrorMessage error={errorMessage} />}
          {loading && <LoadingHandling />}
        </div>
      </div>
    </div>
  );
}

export default GetTemplate;
