import { useState } from "react";
import { createReview } from "../../api/review";

export default function useCreateReview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateReview = async (productId, reviewData) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      //  Important : envoyer l'objet COMPLÈTEMENT 
      const payload = {
        productId,
        rating: reviewData.rating,
        comment: reviewData.comment,
      };

      const res = await createReview(payload, token);

      setSuccess(res.message || "Avis ajouté !");
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
    handleCreateReview,
  };
}
