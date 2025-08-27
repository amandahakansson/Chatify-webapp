import axios from "axios";

const API_BASE = "https://chatify-api.up.railway.app";

// Hämta CSRF-token
export const getCSRFToken = async () => {
  try {
    const res = await axios.patch(`${API_BASE}/csrf`, {}, { withCredentials: true });
    return res.data.csrfToken;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// Registrera användare
export const registerUser = async (userData, csrfToken) => {
  try {
    const payload = { ...userData, csrfToken };
    const res = await axios.post(`${API_BASE}/auth/register`, payload, { withCredentials: true });
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// Generera token (login)
export const loginUser = async (credentials, csrfToken) => {
  try {
    const payload = { ...credentials, csrfToken };
    const res = await axios.post(`${API_BASE}/auth/token`, payload, { withCredentials: true });
    return res.data; // innehåller token
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// Logga ut
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
