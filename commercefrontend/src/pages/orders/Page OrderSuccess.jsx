import { useParams, useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <div className="card p-5 shadow-sm">
        <h1 className="text-success mb-3">🎉 Merci pour votre commande !</h1>

        <p className="fs-5">
          Votre commande <strong>#{id}</strong> a été créée avec succès.
        </p>

        <p className="text-muted">
          Nous vous informerons dès que votre commande sera expédiée.
        </p>

        <hr className="my-4" />

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/orders")}
          >
            📦 Voir mes commandes
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/products")}
          >
            🛍 Continuer mes achats
          </button>
        </div>
      </div>
    </div>
  );
}
