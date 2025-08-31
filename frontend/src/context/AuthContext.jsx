import { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../api/profile";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loggingOut, setLoggingOut] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const profile = await getProfile();
                setUser(profile);
                setError(null);
            } catch (error) {
                setUser(null);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const login = async () => {
        try {
            const data = await getProfile();
            setUser(data);
            setError(null);
            return data;
        } catch (err) {
            setError(err);
            console.error("Failed to fetch profile after login.");
            throw err;
        }
    };

    const logout = async () => {
        setLoggingOut(true);
        try {
            await fetch(`${process.env.VITE_API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            setUser(null);
            setError(null);
            setTimeout(() => (window.location.href = "/login"), 500);
            
        } catch (err) {
            setError(err);
            console.error("Logout failed.", err);
        } finally {
            setLoggingOut(false);
        }
        
    };

    return(
        <AuthContext.Provider value={{ user, login, logout, loading, error, loggingOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);