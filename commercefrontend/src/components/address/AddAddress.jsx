import { useState } from "react";
import useCreateAddress from "../../hooks/address/useCreateAddress";

export default function AddAddress() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    country: "",
    city: "",
    postalCode: "",
    street: "",
    type: "shipping",
    isDefault: false,
  });

  const { loading, error, success, handleCreateAddress } = useCreateAddress();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const created = await handleCreateAddress(form);

    if (created) {
      setForm({
        fullName: "",
        phone: "",
        country: "",
        city: "",
        postalCode: "",
        street: "",
        type: "shipping",
        isDefault: false,
      });
    }
  };

  return (
    <div className="card p-4">
      <h4>📍 Ajouter une adresse</h4>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Nom complet"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Téléphone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Pays"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Ville"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Code postal"
          value={form.postalCode}
          onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Rue / Quartier"
          value={form.street}
          onChange={(e) => setForm({ ...form, street: e.target.value })}
          required
        />

        <select
          className="form-select mb-2"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="shipping">Adresse de livraison</option>
          <option value="billing">Adresse de facturation</option>
        </select>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={form.isDefault}
            onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
          />
          <label className="form-check-label">
            Adresse par défaut
          </label>
        </div>

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Enregistrement..." : "Enregistrer l’adresse"}
        </button>
      </form>
    </div>
  );
}
