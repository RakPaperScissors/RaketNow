import { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../api/profile";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const profile = await getProfile();
                setUser(profile);
            } catch (error) {
                setUser(null);
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
        } catch (err) {
            console.error("Failed to fetch profile after login.");
        }
    };

    const logout = async () => {
        try {
            await fetch("http://localhost:3000/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            setUser(null);
        } catch (err) {
            console.error("Logout failed.", err);
        }
        
    };

    return(
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);