import { useEffect, useState } from "react";
import Uppy from "@uppy/core";
import { useLogdIn } from "../../hooks/logInHook";
import Dashboard from "@uppy/react/dashboard";
import XHRUpload from "@uppy/xhr-upload";

import "@uppy/core/css/style.min.css";
import "@uppy/dashboard/css/style.min.css";
import "@uppy/url/css/style.min.css";

function UploadFile({ uploadedFileChile }) {
  const { getToken } = useLogdIn();
  const [errorMessage, setErrorMessage] = useState("");

  const [uppy] = useState(() => {
    const token = getToken();

    return new Uppy({
      restrictions: {
        maxFileSize: 5 * 1024 * 1024,
        allowedFileTypes: [
          ".pdf",
          ".doc",
          ".docx",
          ".xl",
          ".xls",
          ".xlsx",
          ".ppt",
          ".pptx",
          ".jpg",
          ".jpeg",
          ".png",
          ".html",
          ".text",
          ".cvs",
        ],
        maxNumberOfFiles: 1,
      },
      autoProceed: false,
    }).use(XHRUpload, {
      endpoint: "http://localhost:3000/file",
      method: "POST",
      fieldName: "file",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      getResponseData(responseText) {
        try {
          const json =
            typeof responseText === "string"
              ? JSON.parse(responseText)
              : responseText;
          return {
            url: json.details?.file_id || "",
          };
        } catch (error) {
          console.error("Kunde inte tolka svar som JSON:", error);
          return {};
        }
      },
    });
  });

  useEffect(() => {
    const handelComplet = (result) => {
      console.log("Uppy complete svar:", result);

      if (result.successful.length > 0) {
        const fileRespons = result.successful[0].response.body;
        setErrorMessage("");

        if (uploadedFileChile) {
          uploadedFileChile(fileRespons);
        }
      }
    };

    uppy.on("complete", handelComplet);

    return () => {
      uppy.off("complete", handelComplet);
    };
  }, [uppy, uploadedFileChile]);

  return (
    <div className="m-4">
      <Dashboard
        uppy={uppy}
        height={250}
        width={250}
        hideUploadButton={false}
      />

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default UploadFile;
