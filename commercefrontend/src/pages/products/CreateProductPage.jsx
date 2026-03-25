import CreateProductForm from "../../components/products/CreateProductForm";
import useCreateProduct from "../../hooks/products/useCreateProduct";

export default function CreateProductPage() {
  const { loading, error, success, handleCreate } = useCreateProduct();

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {loading && (
        <div className="text-center mb-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p>Création du produit en cours...</p>
        </div>
      )}

      <CreateProductForm onSubmit={handleCreate} loading={loading} />
    </div>
  );
}
