// import { useState } from "react";
// import { addToCart } from "../../api/cart";

// export default function useAddToCart() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleAddToCart = async (productId, quantity = 1) => {
//     try {
//       setLoading(true);
//       setError("");
//       setSuccess("");

//       const token = localStorage.getItem("token");

//       const payload = {
//         productId,
//         quantity,
//       };

//       const res = await addToCart(payload, token);

//       setSuccess("Produit ajouté au panier !");
//       return res;

//     } catch (err) {
//       setError(err.response?.data?.error || "Erreur inconnue");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     loading,
//     error,
//     success,
//     handleAddToCart,
//   };
// }

import { useState } from "react";
import { addToCart } from "../../api/cart";

export default function useAddToCart() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddToCart = async (productId, quantity = 1) => {
    // 🛡️ Sécurité Frontend : Empêcher l'envoi si les données sont invalides
    if (!productId) {
      setError("ID du produit manquant");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Veuillez vous connecter pour ajouter au panier");
        return;
      }

      // 🛡️ Cast explicite : On s'assure que ce sont des nombres (évite la 400 Bad Request)
      const payload = {
        productId: Number(productId), 
        quantity: Number(quantity),
      };

      const res = await addToCart(payload, token);

      setSuccess("Produit ajouté au panier !");
      
      // Petit hack UX : effacer le message de succès après 3 secondes
      setTimeout(() => setSuccess(""), 3000);

      return res;
    } catch (err) {
      // On capture le message précis du backend pour le débug
      const message = err.response?.data?.message || err.response?.data?.error || "Erreur lors de l'ajout";
      setError(message);
      console.error("Erreur 400 Détails:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, handleAddToCart };
}