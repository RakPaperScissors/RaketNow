import { useState } from 'react';
import { login as loginApi } from '../api/auth';

export function useAuth() {
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const data = await loginApi(email, password);
            localStorage.setItem("access_token", data.access_token);
            setMessage("Login successful.");
            window.location.href = "/home";
        } catch (error) {
            setMessage(error.message || "An error has occured. Please try again.");
        }
    };

    return {
        email,
        password,
        setEmail,
        setPassword,
        message,
        handleLogin
    };
}
