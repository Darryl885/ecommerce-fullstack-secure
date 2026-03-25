// src/components/reviews/ProductReviews.jsx
export default function ProductReviews({ reviews }) {
  // 🛡️ Protection : si reviews n'est pas un tableau, on utilise un tableau vide
  const reviewsList = Array.isArray(reviews) ? reviews : [];

  if (reviewsList.length === 0) {
    return <p className="text-muted">Aucun avis pour le moment.</p>;
  }

  return (
    <div className="list-group mt-3">
      {reviewsList.map((r) => (
        <div key={r.id} className="list-group-item">
          <div className="d-flex justify-content-between">
            <strong>{r.user?.name || "Client"}</strong>
            <span className="text-warning">{"⭐".repeat(r.rating)}</span>
          </div>
          <p className="mb-1">{r.comment}</p>
        </div>
      ))}
    </div>
  );
}