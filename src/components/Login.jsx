import { useState } from "react";
import { loginUser } from "../services/AuthService";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate("/chat"); // redirect till chat
    } catch (err) {
      setError("Inloggning misslyckades!");
    }
  };

  return (
    <div>
      <h2>Logga in</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Lösenord" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Logga in</button>
      </form>
      {error && <p>{error}</p>}
      <p>Ny här? <Link to="/register">Registrera dig</Link></p>
    </div>
  );
}

export default Login;

