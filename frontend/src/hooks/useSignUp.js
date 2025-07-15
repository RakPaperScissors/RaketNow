import { useState } from "react";
import { signUp as signUpApi } from "../api/auth";

export function useSignUp() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        role: "client",
        organizationName: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (form.password !== form.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        try {
            await signUpApi(form);
            setMessage("registration successful!");
            window.location.href = "/login";
        } catch (error) {
            setMessage(error.message || "An error has occurred.");
        }
    };

    return {
        form,
        message,
        handleChange,
        handleSubmit,
        setForm,
    };
}