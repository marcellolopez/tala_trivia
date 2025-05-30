import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            // 1) Autenticarnos
            const res = await axios.post("/api/login", { email, password });
            const { access_token } = res.data;
            localStorage.setItem("token", access_token);

            // 2) Obtener info del usuario actual (necesitas un endpoint /users/me)
            const userRes = await axios.get("/api/users/me", {
                headers: { Authorization: `Bearer ${access_token}` }
            });
            const { role } = userRes.data;
            localStorage.setItem("role", role);

            // 3) Redirigir según role
            if (role === "admin") navigate("/admin");
            else navigate("/player");

        } catch (err) {
            setError(err.response?.data?.detail || "Error de conexión");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <h2 className="mb-4 text-center">Iniciar Sesión</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit} className="d-grid gap-3">
                    <div>
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );

}
