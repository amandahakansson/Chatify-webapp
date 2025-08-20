import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/AuthService";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(username, email, password);
      navigate("/chat"); // redirect till chatten
    } catch (err) {
      console.error(err);
      alert("Fel vid registrering");
    }
  };

  return (
    <div>
      <h1>Registrera dig</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Registrera</button>
      </form>
      <p>Redan medlem? <Link to="/login">Logga in</Link></p>
    </div>
  );
}

export default Register;
