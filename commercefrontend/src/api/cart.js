import axios from "axios";

const API_URL = "http://localhost:3001/api/cartItem";

// ➕ Ajouter au panier
export const addToCart = async (data, token) => {
  const res = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};



// Récupérer les items du panier pour l'utilisateur connecté
export const getCartItems = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Mettre à jour la quantité d’un produit dans le panier
export const updateCartItem = async (cartItemId, quantity, token) => {
  const res = await axios.put(
    `${API_URL}/${cartItemId}`,
    { quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
