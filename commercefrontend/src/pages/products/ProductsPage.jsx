import useProducts from "../../hooks/products/useProducts";
import { Link , useNavigate } from "react-router-dom";

export default function ProductsPage() {
  const { products, loading } = useProducts();
   const navigate = useNavigate();

  if (loading) return <h3 className="text-center mt-5">Chargement...</h3>;

  return (
    <div className="container mt-4">

        
     {/* ======== Bouton Retour ======== */}
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Retour
      </button>
      <h2 className="mb-4 text-center">Nos Produits</h2>

      <div className="row">
        {products.length === 0 && (
          <h5 className="text-center">Aucun produit disponible</h5>
        )}

        {products.map((p) => (
          <div className="col-md-4 col-lg-3 mb-4" key={p.id}>
            <div className="card shadow-sm h-100">

              {/* Image */}
              {p.image ? (
                <img src={p.image} alt={p.name} className="card-img-top" />
              ) : (
                <div
                  className="card-img-top d-flex align-items-center justify-content-center bg-light"
                  style={{ height: "180px" }}
                >
                  <span className="text-muted">Pas d'image</span>
                </div>
              )}

              <div className="card-body text-center">

                {/* Nom */}
                <h5 className="card-title">{p.name}</h5>

                {/* Description */}
                <p className="text-muted small">
                  {p.description?.substring(0, 60)}...
                </p>

                {/* Catégorie */}
                <span className="badge bg-primary mb-2">{p.category}</span>

                {/* Prix */}
                <h5 className="mb-3">{p.price} €</h5>

                {/* Stock */}
                {p.stock > 0 ? (
                  <span className="badge bg-success">En stock</span>
                ) : (
                  <span className="badge bg-danger">Rupture</span>
                )}
                  {/* === Bouton Voir Détails === */}
                <Link
                  to={`/products/${p.id}`}
                  className="btn btn-outline-primary btn-sm mt-2"
                >
                  Voir détails
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
