import { useState } from 'react';
import { login as loginApi } from '../api/auth';

export function useLoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e, onSuccess) => {
        e.preventDefault();
        setMessage("");
        try {
            await loginApi(email, password);
            setMessage("Login successful.");
            if (onSuccess) onSuccess();
        } catch (error) {
            setMessage(error.message || "An error has occurred. Please try again.");
        }
    };

    return { email, password, setEmail, setPassword, message, handleLogin };
}