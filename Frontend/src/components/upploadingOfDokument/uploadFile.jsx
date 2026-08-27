import { useMemo, useState } from "react";
import Uppy from "@uppy/core";
import { useLogdIn } from "../../hooks/logInHook";
import Dashboard from "@uppy/react/dashboard";

import "@uppy/core/css/style.min.css";
import "@uppy/dashboard/css/style.min.css";
import "@uppy/url/css/style.min.css";
import { useDockument } from "../../hooks/saveDataHook";
import { PopUppWindow } from "../smalComponents/popUppWindow";
import { BlueButton } from "../smalComponents/blueButton";

function UploadFile() {
  const { getToken } = useLogdIn();
  const { upploudedFile } = useDockument();
  const [popUpp, setPopUpp] = useState(false);

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;
        resolve(result.split(",")[1]);
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const uppy = useMemo(() => {
    const instans = new Uppy({
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
    });
    const token = getToken();

    instans.on("complete", async ({ successful }) => {
      try {
        const files = await Promise.all(
          successful.map(async (file) => {
            const base64 = await fileToBase64(file.data);
            return {
              file_name: file.name,
              file_content: base64,
            };
          }),
        );

        const payload = files[0];

        console.log(files);

        const response = await fetch("http://localhost:3000/file", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.log(response);
        }

        const data = await response.json();
        console.log(data);
        upploudedFile(data.details.file_id);

        instans.setFileState(successful[0].id, {
          progress: { uploadComplete: true, percentage: 100 },
        });

        setTimeout(() => {
          instans.removeFile(successful[0].id);
          setPopUpp(true);
        }, 1000);
      } catch (error) {
        console.log("Något gick fel: ", error);
      }
    });

    return instans;
  }, [getToken, upploudedFile]);

  return (
    <div className="m-4">
      <PopUppWindow
        isOpen={popUpp}
        title={"Filen ladades upp."}
        content={
          <BlueButton
            buttonText={"Stäng fönstret"}
            buttonClick={() => setPopUpp(false)}
          />
        }
      />
      <Dashboard
        uppy={uppy}
        height={250}
        width={250}
        hideUploadButton={false}
      />
    </div>
  );
}

export default UploadFile;
