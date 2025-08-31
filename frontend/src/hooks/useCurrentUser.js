import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export function useCurrentUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/auth/me`, {
      credentials: "include", // <- this ensures the cookie is sent
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return user;
}
