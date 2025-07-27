import { useEffect, useState } from "react";

export function useCurrentUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("access_token");
    if (!raw) return setUser(null);

    try {
      const token = raw.startsWith("Bearer ") ? raw.split(" ")[1] : raw;
      const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(atob(base64));
      const uid = payload.uid ?? payload.sub ?? payload.userId ?? payload.id;

      setUser(
        uid
          ? { uid, email: payload.email, role: payload.role }
          : null
      );
    } catch (e) {
      console.error("Failed to decode token", e);
      setUser(null);
    }
  }, []);

  return user;
}
