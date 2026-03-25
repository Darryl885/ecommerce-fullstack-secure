import { useState } from "react";
import { createAddress } from "../../api/address";

export default function useCreateAddress() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateAddress = async (addressData) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      const res = await createAddress(addressData, token);

      setSuccess(res.message || "Adresse ajoutée avec succès");
      return res.address;
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de l’ajout de l’adresse");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    handleCreateAddress,
  };
}
