import { useState, useEffect, useCallback } from "react";
import { getReviewsByProduct } from "../../api/review";

export default function useGetReviewsByProduct(productId) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getReviewsByProduct(productId);
      setReviews(data);

    } catch (err) {
      setError("Impossible de charger les avis");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    handleGetReviews();
  }, [handleGetReviews]);

  return {
    reviews,
    loading,
    error,
    handleGetReviews,
  };
}
