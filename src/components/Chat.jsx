import { logoutUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div>
      <h1>Välkommen till Chat</h1>
      <button onClick={handleLogout}>Logga ut</button>
      {/* Här kan du bygga chat-komponenten */}
    </div>
  );
}

export default Chat;
