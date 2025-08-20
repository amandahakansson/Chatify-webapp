import axios from "axios";

// Eftersom vi använder Vite-proxy, räcker det med "/api"
const API_URL = "/api";

// Registrera användare
export const registerUser = async (username, email, password) => {
  try {
    const res = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.error("Registrering misslyckades:", error);
    throw error;
  }
};

// Logga in användare
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    // Spara token i localStorage
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    return res.data;
  } catch (error) {
    console.error("Inloggning misslyckades:", error);
    throw error;
  }
};

// Hämta token från localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Logga ut användare
export const logoutUser = () => {
  localStorage.removeItem("token");
};
