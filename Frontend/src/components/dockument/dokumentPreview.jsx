import { useEffect, useState } from "react";
import FetchBackend from "../fetchBackend";
import { LoadingHandling } from "../smalComponents/loadingHandling";
import { ErrorMessage } from "../smalComponents/errorMessage";

export function DokumentPreview({ email }) {
  const [previewDokumet, setPreviewDokumet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessaage, setErrorMessage] = useState();

  useEffect(() => {
    const previewURL = async (email) => {
      if (!email) return;
      setLoading(true);

      try {
        const response = await FetchBackend({
          crud: "POST",
          url: "/createDocument/documentUser",
          body: { userEmail: email },
        });

        if (response instanceof Error) {
          console.error(
            "Preview av dokument kunde inte hämtas: ",
            response.error,
          );
          setErrorMessage(response.error);
          setLoading(false);
        } else {
          setPreviewDokumet(response);
          setLoading(false);
        }
      } catch (error) {
        console.error(
          "Preview på dokumentetn kunde inte hämtas för användaren.",
          error,
        );
        setErrorMessage(error.message);
        setLoading(false);
      }
    };
    if (email) {
      previewURL(email);
    }
  }, [email]);
  return (
    <div className="overflow-y-auto max-h-[calc(96vh-220px)] ">
      {previewDokumet &&
        previewDokumet.length > 0 &&
        previewDokumet.map((url, index) => (
          <div key={index}>
            <iframe
              src={url}
              title="`Preview av dockument ${index +1}`"
              frameBorder="0"
              allow="fullscreen; clipboard-read; clipboard-write"
              className=" w-[78vw] h-[60vh]"
            ></iframe>
          </div>
        ))}
      {loading && <LoadingHandling />}
      {errorMessaage && <ErrorMessage error={errorMessaage} />}
    </div>
  );
}
