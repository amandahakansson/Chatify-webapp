import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Chat from "./components/chat/Chat";
import { AuthProvider } from "./context/AuthProvider"; 
import SideNav from "./components/sidenav/Sidenav";
import { useAuth } from "./context/useAuth";

function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function AppLayout() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="app-layout">
      {isLoggedIn && <SideNav />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/chat" replace />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/chat" replace /> : <Login />} />
          <Route path="/register" element={isLoggedIn ? <Navigate to="/chat" replace /> : <Register />} />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}
