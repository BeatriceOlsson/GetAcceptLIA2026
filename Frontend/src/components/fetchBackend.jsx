async function FetchBackend({ url, crud, body, token }) {
  console.log(url, crud, body, token);
  const backendURL = import.meta.env.VITE_API_BACKEND_URL;

  try {
    const response = await fetch(`${backendURL}${url}`, {
      method: crud,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data);
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
