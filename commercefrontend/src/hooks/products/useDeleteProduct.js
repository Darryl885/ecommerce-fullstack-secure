import { useState } from "react";
import { deleteProduct } from "../../api/product";

export default function useDeleteProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleDelete = async (id) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await deleteProduct(id);
      setSuccess(res.message);
    } catch (err) {
      setError(err.response?.data?.error ?? "Erreur serveur");
    }

    setLoading(false);
  };

  return { loading, error, success, handleDelete };
}
