import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCreateReview from "../../hooks/Reviews/useCreateReview";

export default function AddReview({ productId }) {
  const [form, setForm] = useState({ rating: 5, comment: "" });
  const { loading, error, success, handleCreateReview } = useCreateReview();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateReview(productId, form);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/"); // redirection vers la HomePage
      }, 1500); // petite pause pr afficher le msg
    }
  }, [success, navigate]);

  return (
    <div className="mt-3">
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Note :</label>
          <select
            className="form-select"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} ⭐
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label>Commentaire :</label>
          <textarea
            className="form-control"
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            rows={3}
          />
        </div>

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Envoi..." : "Ajouter un avis"}
        </button>
      </form>
    </div>
  );
}

//useNavigate()
// useEffect() pour surveiller success