import { useState } from 'react';
import { login as loginApi } from '../api/auth';

export function useAuth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            await loginApi(email, password);
            setMessage("Login successful.");
            window.location.href = "/home";
        } catch (error) {
            setMessage(error.message || "An error has occurred. Please try again.");
        }
    };

    return { email, password, setEmail, setPassword, message, handleLogin };
}