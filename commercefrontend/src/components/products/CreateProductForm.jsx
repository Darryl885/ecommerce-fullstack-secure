import { useState } from "react";

export default function CreateProductForm({ onSubmit, loading }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, price, stock, category, image });
  };

  return (
    <form className="card p-4 shadow-sm" onSubmit={submit}>
      <h3 className="mb-3 text-center">Créer un produit</h3>

      <div className="mb-3">
        <label>Nom</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Description</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Prix</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Stock</label>
        <input
          type="number"
          className="form-control"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Catégorie</label>
        <input
          type="text"
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Image (URL)</label>
        <input
          type="text"
          className="form-control"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <button className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Création en cours..." : "Créer le produit"}
      </button>
    </form>
  );
}
