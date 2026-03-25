import axios from "axios";

const API_URL = "http://localhost:3001/api/users";

// export const registerUser = async (data) => {
//   const response = await axios.post(`${API_URL}/register`, data);
//   return response.data;
// };

// Version vulnérable
// dépendance à localStorage / token côté client
export const registerUser = async (data) => {
  // VULN #2 bis: si un token était dans localStorage, on le colle en header
  // (mauvaise pratique si vous avez aussi XSS)
  const token = localStorage.getItem("token");

  const response = await axios.post(`${API_URL}/register`, data, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return response.data;
};

// api/user.js (secure)

// const api = axios.create({
//   baseURL: API_URL,
//   timeout: 10000,
//   headers: { "Content-Type": "application/json" },
//   // Activez seulement si votre backend utilise cookies HttpOnly et CORS credentials
//   // withCredentials: true,
// });

// export const registerUser = async (data) => {
//   const response = await api.post("/register", {
//     email: data.email,
//     password: data.password,
//   });
//   return response.data;
// };



//login 
// export const loginUser = async (data) => {
//   const response = await axios.post(`${API_URL}/login`, data);
//   return response.data;
// };

// login (VULN)
export const loginUser = async (data) => {
  const token = localStorage.getItem("token"); //  VULN: dépendance à localStorage

  const response = await axios.post(`${API_URL}/login`, data, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    //  Même si ton backend ignore ce header en login, c'est une mauvaise habitude:
    // XSS → vol token → réutilisation automatique
  });

  return response.data;
};

// login sécurisé

// export const loginUser = async ({ email, password }) => {
//   const response = await api.post("/login", { email, password });
//   return response.data; 
   //  Chez toi: { message, data: { token, user, message }, debug, rawBody }
// };

// Objectifs :

// Lire correctement res.data.token / res.data.user (car ton backend enveloppe dans data)
// Ajouter timeout
// Ne pas injecter de token depuis localStorage
// (Optionnel) withCredentials uniquement si tu passes à des cookies HttpOnly côté backend



// Récupération du profil utilisateur connecté
// get profile
export const getProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

// RÉCUPÉRATION DES COMMANDES D'UN USER → Bearer Token
// ─────────────────────────────────────────────────────
export const getUserOrders = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}/orders`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};
