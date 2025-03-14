import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login: username, password })
            });
            const data = await response.json();
            if (data.status === "success") {
                navigate("/listaRobots");
            } else {
                setError("Error de autenticación. Revise sus credenciales.");
            }
        } catch (error) {
            setError("Error de conexión con el servidor");
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            
            <div className="mt-5">

            <Banner />
            </div>
            
            <div className="container flex-grow-1 d-flex flex-column justify-content-center align-items-center">
                <div className="card p-4 border-light" style={{ width: "400px" }}>
                    <h3 className="fw-bold text-center">Inicio de sesión</h3>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3 text-start">
                            <label className="form-label fw-bold">Nombre de usuario</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label className="form-label fw-bold">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary w-50">Ingresar</button>
                            <button type="button" className="btn btn-danger w-50 ms-2">Cancelar</button>
                        </div>
                    </form>
                    {error && <p className="text-danger mt-3 text-center">{error}</p>}
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default Login;
