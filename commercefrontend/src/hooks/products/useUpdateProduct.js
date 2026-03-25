import { useState } from "react";
import { updateProduct } from "../../api/updateProduct";
import { useNavigate } from "react-router-dom";


export default function useUpdateProduct() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleUpdate = async (productId, formData) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      await updateProduct(productId, formData, token);

      setSuccess("Produit mis à jour avec succès !");

      setTimeout(() => {
        navigate(`/products/${productId}`);
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.error || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, handleUpdate };
}
