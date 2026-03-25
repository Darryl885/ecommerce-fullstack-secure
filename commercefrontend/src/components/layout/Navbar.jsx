// src/components/layout/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const { cartItems, fetchCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Déconnexion : supprime token et user
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setUser(null);
    navigate("/");
  };

  // Récupère le panier à chaque rendu si utilisateur connecté
  useEffect(() => {
    if (user) fetchCartItems();
  }, [user, fetchCartItems]);

  // Calcul du nombre total d'articles dans le panier
  const cartCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        My E-Commerce
      </Link>

      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Accueil
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/products" className="nav-link">
            Produits
          </Link>
        </li>

        {user && user.role === "admin" && (
          <li className="nav-item">
            <Link to="/admin/products/create" className="nav-link">
              Créer un produit
            </Link>
          </li>
        )}
      </ul>

      <div className="ms-auto d-flex align-items-center">
        {user ? (
          <>
            <span className="text-white me-3">Bonjour, {user.email}</span>

            {/* Lien vers Mon Panier avec badge */}
            <Link to="/cart" className="btn btn-outline-light me-3 position-relative">
              🛒 Panier
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.7rem" }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/profile" className="btn btn-light me-2">
              Profil
            </Link>
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-light me-2">
              Se connecter
            </Link>
            <Link to="/register" className="btn btn-primary">
              S'inscrire
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
