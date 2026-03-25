import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../api/product";
import useDeleteProduct from "../../hooks/products/useDeleteProduct";
// 1. On n'utilise plus le hook local qui était "isolé"
// import useAddToCart from "../../hooks/cart/useAddToCart"; 
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext"; // 2. On importe le Contexte global
import AddReview from "../../components/reviews/AddReview";
import ProductReviews from "../../components/reviews/ProductReviews";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  const { user } = useContext(UserContext);
  const { handleDelete, success: deleteSuccess } = useDeleteProduct();

  // 3. On récupère les fonctions et états du panier depuis le contexte global
  // Cela garantit que la Navbar et la Page Panier se mettent à jour en même temps
  const { 
    loading: loadingCart, 
    error: cartError, 
    success: cartSuccess, 
    handleAddToCart 
  } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Produit introuvable");
      }
    };
    fetchProduct();
  }, [id]);

  if (error) return <div className="container mt-5"><h3 className="text-danger">{error}</h3></div>;
  if (!product) return <div className="container mt-5"><h3>Chargement...</h3></div>;

  return (
    <div className="container mt-4">
      {/* === Retour === */}
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <div className="row">
        {/* Colonne Image */}
        <div className="col-md-5">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          ) : (
            <div className="bg-light d-flex align-items-center justify-content-center rounded" style={{ height: "300px" }}>
              <span className="text-muted">Aucune image disponible</span>
            </div>
          )}
        </div>

        {/* Colonne Infos */}
        <div className="col-md-7">
          <h2>{product.name}</h2>
          <p className="text-muted">Catégorie : <span className="badge bg-info text-dark">{product.category || "Général"}</span></p>
          <hr />
          <p><strong>Description:</strong> {product.description}</p>
          <h3 className="text-primary mb-3">{product.price} €</h3>

          {/* === Bouton Ajouter au panier === */}
          <button
            className="btn btn-primary btn-lg mt-2"
            disabled={loadingCart}
            onClick={() => handleAddToCart(id, 1)} 
          >
            {loadingCart ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Ajout en cours...
              </>
            ) : (
              "🛒 Ajouter au panier"
            )}
          </button>

          {/* Messages de retour Panier */}
          {cartError && <div className="alert alert-danger mt-3 small">{cartError}</div>}
          {cartSuccess && <div className="alert alert-success mt-3 small">{cartSuccess}</div>}

          {/* === Admin buttons === */}
          {user?.role === "admin" && (
            <div className="mt-5 p-3 border border-warning rounded bg-light">
              <h5 className="text-warning">Administration</h5>
              <button
                className="btn btn-warning mt-2 me-2"
                onClick={() => navigate(`/admin/products/update/${id}`)}
              >
                ✏️ Modifier le produit
              </button>

              <button
                className="btn btn-danger mt-2"
                onClick={() => {
                  if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
                    handleDelete(id);
                    setTimeout(() => navigate("/products"), 1500);
                  }
                }}
              >
                🗑 Supprimer le produit
              </button>
              {deleteSuccess && <div className="alert alert-success mt-2 small">{deleteSuccess}</div>}
            </div>
          )}
        </div>
      </div>

      <hr className="my-5" />

      {/* ================= REVIEWS SECTION ================= */}
      <div className="row mb-5">
        <div className="col-md-6">
          <h4 className="mb-3">Avis des clients</h4>
          <ProductReviews reviews={product.reviews || []} />
        </div>

        <div className="col-md-6">
          <h4 className="mb-3">Donner votre avis</h4>
          {user ? (
            <AddReview productId={id} />
          ) : (
            <div className="alert alert-info">
              Veuillez vous <button className="btn btn-link p-0 pb-1" onClick={() => navigate('/login')}>connecter</button> pour laisser un commentaire.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}