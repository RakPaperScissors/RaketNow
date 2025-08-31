import { useState } from 'react';
import { login as loginApi } from '../api/auth';
import { getProfile } from '../api/profile';

export function useLoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        setMessageType("");
        setLoading(true);

        try {
            await loginApi(email, password);
            const user = await getProfile();
            setMessage("Login successful.");
            setMessageType("success");
            return user;
        } catch (error) {
            setMessage(error.message || "An error has occurred. Please try again.");
            setMessageType("error");
            throw error;
        }finally {
            setLoading(false);
        }
    };

    return { email, password, setEmail, setPassword, message, messageType, handleLogin };
}