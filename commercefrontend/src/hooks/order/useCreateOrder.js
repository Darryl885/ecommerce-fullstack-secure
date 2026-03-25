import { useState } from "react";
import { createOrder } from "../../api/order";

export default function useCreateOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateOrder = async (addressId) => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const data = await createOrder(addressId, token);

      setSuccess("Commande créée avec succès 🎉");
      return data.order;
    } catch (err) {
      setError(err.response?.data?.error || "Erreur création commande");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, handleCreateOrder };
}
