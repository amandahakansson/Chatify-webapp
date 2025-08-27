import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Chat from "./components/chat/Chat";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // optional: lyssna på förändringar i localStorage om du vill
  useEffect(() => {
    const handleStorage = () => setIsAuthenticated(!!localStorage.getItem("token"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/chat" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/chat" /> : <Register setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/chat"
          element={isAuthenticated ? <Chat /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
