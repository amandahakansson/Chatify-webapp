import axios from "axios";

const API_BASE = "https://chatify-api.up.railway.app";

export const getCSRFToken = async () => {
  try {
    const res = await axios.patch(`${API_BASE}/csrf`, {}, { withCredentials: true });
    return res.data.csrfToken;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const registerUser = async (userData, csrfToken) => {
  try {
    const payload = { ...userData, csrfToken };
    const res = await axios.post(`${API_BASE}/auth/register`, payload, { withCredentials: true });
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const loginUser = async (credentials, csrfToken) => {
  try {
    const payload = { ...credentials, csrfToken };
    const res = await axios.post(`${API_BASE}/auth/token`, payload, { withCredentials: true });
    return res.data; 
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const logoutUser = () => {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("token");
};


export const getMessages = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.get(`${API_BASE}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};


export const createMessage = async (text, csrfToken) => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.post(
      `${API_BASE}/messages`,
      { text, csrfToken },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};


export const deleteMessage = async (id, csrfToken) => {
  try {
    const token = sessionStorage.getItem("token");
    await axios.delete(`${API_BASE}/messages/${id}`, {
      headers: { Authorization: `Bearer ${token}`, "x-csrf-token": csrfToken },
      withCredentials: true,
    });
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};
