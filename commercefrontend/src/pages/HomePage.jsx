import { useState, useEffect } from "react";
import useProducts from "../hooks/products/useProducts";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";   // <--- IMPORT IMPORTANT


export default function HomePage() {
  const { products, loading } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let f = products;

    if (search !== "") {
      f = f.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "") {
      f = f.filter((p) => p.category === category);
    }

    setFilteredProducts(f);
  }, [products, search, category]);

  if (loading) return <h3 className="text-center mt-5">Chargement...</h3>;

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Bienvenue dans notre boutique 🛍️</h2>

      {/* ======================= FILTRES ======================= */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="🔎 Rechercher un produit..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ======================= CAROUSEL ======================= */}
      {products.length > 0 && (
        <Carousel className="mb-4">
          {products.slice(0, 4).map((p) => (
            <Carousel.Item key={p.id}>
              <img
                className="d-block w-100"
                src={p.image || "https://via.placeholder.com/1200x300"}
                alt={p.name}
                style={{
                  maxHeight: "300px",
                  objectFit: "cover",
                }}
              />
              <Carousel.Caption className="bg-dark bg-opacity-50 p-2 rounded">
                <h5>{p.name}</h5>
                <strong>{p.price} €</strong>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      {/* ======================= LISTE PRODUITS ======================= */}
      <h4 className="mb-3">Produits populaires</h4>

      <div className="row">
        {filteredProducts.length === 0 && (
          <h5 className="text-center">Aucun produit correspondant</h5>
        )}

        {filteredProducts.slice(0, 8).map((p) => (
          <div className="col-md-4 col-lg-3 mb-4" key={p.id}>
            <div className="card shadow-sm h-100">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="card-img-top d-flex align-items-center justify-content-center bg-light"
                  style={{ height: "180px" }}
                >
                  <span className="text-muted">Pas d'image</span>
                </div>
              )}

              <div className="card-body text-center">
                <h5 className="card-title">{p.name}</h5>
                <h6 className="text-primary">{p.price} €</h6>
                <span className="badge bg-primary">{p.category}</span>

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
