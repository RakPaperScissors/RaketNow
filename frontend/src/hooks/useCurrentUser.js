export function useCurrentUser() {
    const token = localStorage.getItem("access_token");

    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
            uid: payload.uid,
            email: payload.email,
            role: payload.role,
        };
    } catch (e) {
        console.error("Failed to decode token", e);
        return null;
    }
}
