import { useState } from 'react';
import { login as loginApi } from '../api/auth';

export function useLoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleLogin = async (e, onSuccess) => {
        e.preventDefault();
        setMessage("");
        setMessageType("");
        try {
            await loginApi(email, password);
            setMessage("Login successful.");
            setMessageType("success");
            if (onSuccess) onSuccess();
        } catch (error) {
            setMessage(error.message || "An error has occurred. Please try again.");
            setMessageType("error");
        }
    };

    return { email, password, setEmail, setPassword, message, messageType, handleLogin };
}