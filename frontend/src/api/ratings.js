// for ratings
export async function submitRating(userId, raketId, score) {
  try {
    const response = await fetch(`http://localhost:3000/ratings/${userId}/${raketId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ score })
    });

    if (!response.ok) {
      throw new Error("Failed to submit rating");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting rating:", error);
    throw error;
  }
}