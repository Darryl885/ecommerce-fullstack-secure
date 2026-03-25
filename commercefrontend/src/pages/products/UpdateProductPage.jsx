import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {getProductById} from "../../api/product";
import useUpdateProduct from "../../hooks/products/useUpdateProduct";

export default function UpdateProductPage() {
  const { id } = useParams();
  const { handleUpdate, loading, error, success } = useUpdateProduct();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: ""
  });

  useEffect(() => {
    const loadProduct = async () => {
      const p = await getProductById(id);
      setForm(p);
    };
    loadProduct();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(id, form);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h3 className="mb-3">Modifier produit</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Nom"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="form-control mb-2"
          placeholder="Prix"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          className="form-control mb-2"
          placeholder="Catégorie"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          className="form-control mb-2"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description"
          rows="3"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Mise à jour..." : "Modifier"}
        </button>
      </form>
    </div>
  );
}
