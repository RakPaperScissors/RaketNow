import { useState, useCallback } from 'react';
import { signUp, verifyEmail, resendVerificationCode } from '../api/auth';

export function useEmailVerification() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    
    const handleRegister = async (formData) => {
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            const response = await signUp(formData);
            setMessage(response.message);
            setShowVerificationModal(true);
        } catch (err) {
            setError(err.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (email, code) => {
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            const response = await verifyEmail(email, code);
            setMessage(response.message);
            setShowVerificationModal(false);
            setTimeout(() => {
                window.location.href = '/login';
            }, 1500);

        } catch (err) {
            setError(err.message || 'Verification failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = useCallback(async (email) => {
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            const response = await resendVerificationCode(email);
            setMessage(response.message);
        } catch (err) {
            setError(err.message || 'Failed to resend code.');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        message,
        showVerificationModal,
        setShowVerificationModal,
        handleRegister,
        handleVerify,
        handleResend,
        clearError: () => setError(null),
        clearMessage: () => setMessage(null),
    };
}