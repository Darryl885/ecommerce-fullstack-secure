import { useState } from "react";
import { createProduct } from "../../api/product";
import { useNavigate } from "react-router-dom";

export default function useCreateProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");
      await createProduct(formData, token);

      setSuccess("Produit créé avec succès !");

      setTimeout(() => {
        navigate("/admin/products");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    handleCreate,
  };
}
