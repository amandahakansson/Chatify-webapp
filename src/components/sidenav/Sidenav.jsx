import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function SideNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (!user) return null; 

  return (
    <aside className="sidenav">
      <div className="user-info">
        {user.avatar && (
          <img
            src={user.avatar}
            alt="avatar"
            className="avatar"
          />
        )}
        <h3>{user.username}</h3>
        <p>{user.email}</p>
      </div>

      <button onClick={handleLogout} className="logout-btn">
        Logga ut
      </button>
    </aside>
  );
}

export default SideNav;
