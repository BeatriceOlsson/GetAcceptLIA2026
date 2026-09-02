async function FetchBackend({ url, crud, body }) {
  const backendURL = import.meta.env.VITE_API_BACKEND_URL;

  try {
    const dataToSend = {
      method: crud,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    if (crud !== "GET" && body) {
      dataToSend.body = JSON.stringify(body);
    }

    const response = await fetch(`${backendURL}${url}`, dataToSend);

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Okänt fel uppstog");
    }
    return data;
  } catch (error) {
    console.error("Fel uppstog: ", error);
    return error;
  }
}

export default FetchBackend;
