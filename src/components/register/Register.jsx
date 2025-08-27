import { useState } from "react";
import { registerUser } from "../../services/AuthService";
import { useNavigate, Link } from "react-router-dom";
import { getCSRFToken } from "../../services/AuthService"; 
import "./register.css";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        avatar: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
   
    try {
        const csrf = await getCSRFToken();
        await registerUser(formData, csrf);
        setSuccess("Registrering lyckades!");
        setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      setError(err?.message || JSON.stringify(err) || "Registrering misslyckades!");
    }
   
  
    };
    
  return (
    <div className="register-wrapper">
    <h2>Registrera dig</h2>
    <form onSubmit={handleSubmit} className="register-form">
      <input
        type="text"
        name="username"
        placeholder="Användarnamn"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Lösenord"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="avatar"
        placeholder="Avatar-URL (valfritt)"
        value={formData.avatar}
        onChange={handleChange}
      />
      <button type="submit">Registrera</button>
    </form>
    {error && <p className="error">{error}</p>}
    {success && <p className="success">{success}</p>}
    <p>
        Har du redan ett konto?{" "}
        <Link to="/login" className="login-link">
          Logga in här
        </Link>
      </p>
  </div>
  );

}

export default Register;
