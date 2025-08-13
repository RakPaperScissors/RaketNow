const API_URL = import.meta.env.VITE_API_URL;

export async function submitRating(raketId, rating) {
  try {
    const response = await fetch(`${API_URL}/ratings/${raketId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // sends cookies for JWT
      body: JSON.stringify({ rating: Number(rating) })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit rating");
    }

    return data;
  } catch (error) {
    console.error("Error submitting rating:", error);
    throw error;
  }
}
