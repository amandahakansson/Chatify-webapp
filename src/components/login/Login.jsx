import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCSRFToken, loginUser } from "../../services/AuthService";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthProvider"; 
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const csrf = await getCSRFToken();
      const data = await loginUser(credentials, csrf); 
      const decoded = jwtDecode(data.token);

      const userData = {
        id: decoded.sub,
        username: decoded.username,
        email: decoded.email,    
        avatar: decoded.avatar,
      };

      login(userData, data.token);
      navigate("/chat", { replace: true });
      setSuccess("Inloggningen lyckades!");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Något gick fel vid inloggning.";
      setError(msg);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Logga in</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="username"
            placeholder="Användarnamn"
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Lösenord"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Logga in</button>
        </form>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <p>
          Har du inget konto?{" "}
          <Link to="/register" className="register-link">Registrera här</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
