// src/hooks/payment/useStripePayment.js
import axios from "axios";
import { useState } from "react";

export default function useStripePayment() {
  const [loading, setLoading] = useState(false);

  const handleStripePayment = async (paymentData) => {
    setLoading(true);
    try {
      // 1️⃣ Récupération du token
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token manquant : Vous devez être connecté.");
      }

      // 2️⃣ Appel API avec le Header Authorization (Standard OWASP)
      const response = await axios.post(
        "http://localhost:3001/api/payments/createCheckoutSession",
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🛡️ Crucial pour passer le middleware 'isAuthenticated'
          },
        }
      );

      // 💳 Redirection vers Stripe
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      // 📝 Logique pour ton mémoire : on capture l'erreur pour le monitoring
      console.error("Erreur Paiement:", err.response?.data?.message || err.message);
      alert(err.message || "Erreur lors de l'initiation du paiement.");
    } finally {
      setLoading(false);
    }
  };

  return { handleStripePayment, loading };
}