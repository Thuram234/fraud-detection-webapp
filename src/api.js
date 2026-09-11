const API_URL = "https://fraud-detection-api-sj4a.onrender.com";

export async function predictTransaction(transactionData) {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transactionData),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'appel à l'API");
  }

  return response.json();
}