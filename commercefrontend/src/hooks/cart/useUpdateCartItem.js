// src/hooks/cart/useUpdateCartItem.js
import { useState } from "react";
import { updateCartItem } from "../../api/cart";

export default function useUpdateCartItem() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdateCartItem = async (cartItemId, quantity) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");
      const res = await updateCartItem(cartItemId, quantity, token);

      setSuccess(res.message || "Quantité mise à jour !");
      return res.updated; // retourne l'item mis à jour si besoin
    } catch (err) {
      setError(err.response?.data?.error || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, handleUpdateCartItem };
}
