/*import Dashboard from "@uppy/react/dashboard";
import { useEffect, useState } from "react";


------Boykota------

import "@uppy/core/css/style.min.css";
import "@uppy/dashboard/css/style.min.css";
import "@uppy/url/css/style.min.css";
import { useLogdIn } from "../context/logdInContext";
import XHRUpload from "@uppy/xhr-upload";

function UploadUrl() {
  const { getToken } = useLogdIn();
  const [errorMessage, setErrorMessage] = useState("");

  const [uppy] = useState(() => {
    const token = getToken();

    return new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        maxFileSize: 5 * 1024 * 1024,
        alloewedFileTypes: [
          ".pdf",
          ".doc",
          ".docx",
          ".xl",
          ".xls",
          ".xlsx",
          ".ppt",
          ".pptx",
        ],
      },
      autoProceed: false,
    }).use(XHRUpload, {
      endpoint: "http://localhost:3000/file",
      method: "POST",
      fieldName: "file",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      getRespnseData(responseText) {
        try {
          const json =
            typeof responseText === "string"
              ? JSON.parse(responseText)
              : responseText;
          return { url: json.details?.file - id || "" };
        } catch (error) {
          console.error("Kunde inte tolka svar som JSON:", error);
          return {};
        }
      },
    });
  });

  useEffect(() => {
    const handelCompleate = (result) => {
        console.log("Uppy complete svar:", result);

        if (result.successful.length > 0) {
            const fileRespons
        }
    }
  })
  return (
    <div>
      <Dashboard
        uppy={uppy}
        height={200}
        width={50}
        hideUploadButton={false}
        plugins={["Url"]}
      />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default UploadUrl;*/
