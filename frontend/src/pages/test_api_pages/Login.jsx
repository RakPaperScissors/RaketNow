import { useLoginForm } from "../../hooks/useLoginForm";
import { useAuth } from "../../context/AuthContext";

function Login() {
    const { email, password, setEmail, setPassword, message, handleLogin } = useLoginForm();
    const { login } = useAuth();

    const handleSubmit = (e) => {
        handleLogin(e, async () => {
            await login();
            window.location.href = "/home";
        });
    };


    return (
        <div style={{ maxWidth: 400, margin: '40px auto', border: "1px solid #ccc", padding: 24, borderRadius: 8 }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 12 }}>
                    <label>Email:</label>
                    <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{ width: "100%", padding: 8, marginTop: 4, border: "1px solid black" }}
                    />
                </div>
                <div style={{ marginBottom: 12 }}>
                    <label>Password:</label>
                    <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={{ width: "100%", padding: "8", marginTop: "4", border: "1px solid black" }}
                    />
                </div>
                <button type="submit" style={{ width: "100%", padding: 10, background: "#0C2C57", color: "#fff", border: "none", borderRadius: 4 }}>
                    Login
                </button>
            </form>
            {message}
        </div>
    );
};

export default Login;